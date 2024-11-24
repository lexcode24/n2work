import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import {AuthModule} from "./auth/auth.module";
import {PrismaModule} from "./prisma/prisma.module";
import {PermissionModule} from "./permission/permission.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      AuthModule,
      UserModule,
      PrismaModule,
      ContactModule,
      PermissionModule,
  ],
})
export class AppModule {}
