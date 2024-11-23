import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { BaseModule } from './old_base/base.module';
import { ContactModule } from './contact/contact.module';
import {AuthModule} from "./auth/auth.module";
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      AuthModule,
      UserModule,
      //BaseModule,
      ContactModule,
      //RoleModule,
      //PermissionModule
  ],
})
export class AppModule {}
