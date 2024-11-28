import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../prisma/prisma.service";
import {BaseModule} from "../base/base.module";

@Module({
  imports: [BaseModule.register(UserService)],
  controllers: [UserController],
  //providers: [UserService, PrismaService ],
  //exports: [UserService]
})
export class UserModule {}
