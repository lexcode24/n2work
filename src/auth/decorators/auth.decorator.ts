import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../guards/jwt.guard";
import {AuthGuard} from "../guards/auth.guard";

export const Auth = (permission?: string) => {
    return applyDecorators(
        SetMetadata('permission', permission),
        UseGuards(JwtAuthGuard, AuthGuard)
    );
}