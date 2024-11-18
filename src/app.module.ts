import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { BaseModule } from './base/base.module';
import { ContactModule } from './contact/contact.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      AuthModule,
      UserModule,
      BaseModule,
      ContactModule
  ],
})
export class AppModule {}
