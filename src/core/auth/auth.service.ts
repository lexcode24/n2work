import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt"
import {UserService} from "../user/user.service";
import {AuthDto} from "./dtos/auth.dto";
import {verify} from "argon2";
import {ConfigService} from "@nestjs/config";
import {Response} from "express";
import {CreateUserDto} from "../user/dtos/create.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private userService: UserService,
        private configService: ConfigService) {}

    async login(dto: AuthDto) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.validateUser(dto)

        const tokens = await this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    async register(dto: CreateUserDto) {
        const oldUser = await this.userService.findByEmail(dto.email)
        if(oldUser) throw new BadRequestException('User with this email already exists')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.userService.create(dto)

        const tokens = await this.issueTokens(user.id)

        // await this.emailService.sendUserConfirmation(user.email, user.id)

        return {
            user,
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken)
        if(!result) throw new UnauthorizedException('Invalid refresh token')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.userService.findOne(result.id)

        const tokens = await this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }

    private async issueTokens(userId: number) {
        const data = { id: userId }

        const refreshToken = await this.jwt.signAsync(data, {
            expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        })

        const accessToken = await this.jwt.signAsync(data, {
            expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        })

        return { refreshToken, accessToken }
    }

    private async validateUser(dto: AuthDto) {
        const user =  await this.userService.findByEmail(dto.email)
        if(!user) throw new UnauthorizedException('Email or password invalid')

        const isValid = await verify(user.password, dto.password)
        if(!isValid) throw new UnauthorizedException('Email or password invalid')

        return user
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.configService.get('EXPIRE_REFRESH_TOKEN'))

        res.cookie(this.configService.get('REFRESH_TOKEN_NAME'), refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            // true if production
            secure: false,
            // lax if production
            sameSite: 'none',
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.configService.get('REFRESH_TOKEN_NAME'), '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            // true if production
            secure: false,
            // lax if production
            sameSite: 'none',
        })
    }

}