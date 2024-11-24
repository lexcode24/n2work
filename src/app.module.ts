import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './core/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import {AuthModule} from "./core/auth/auth.module";
import {PrismaModule} from "./core/prisma/prisma.module";
import {PermissionModule} from "./core/permission/permission.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      AuthModule,
      UserModule,
      PrismaModule,
      PermissionModule,
      ContactModule,
  ],
})
export class AppModule {}
