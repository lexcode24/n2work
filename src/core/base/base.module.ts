import { Module, DynamicModule, Provider } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Module({})
export class BaseModule {
    static register(serviceClass?: any): DynamicModule {
        const dynamicProviders: Provider[] = [
            {
                provide: serviceClass,
                useClass: serviceClass,
            },
        ];

        return {
            module: BaseModule,
            providers: [...dynamicProviders, PrismaService],
            exports: dynamicProviders,
        };
    }
}