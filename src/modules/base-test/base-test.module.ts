import { DynamicModule, Module, Provider } from '@nestjs/common';

@Module({})
export class BaseTestModule {
    static register(createDto: any): DynamicModule {
        const providers: Provider[] = [
            {
                provide: 'CREATE_DTO',
                useValue: createDto,
            },
        ];

        return {
            module: BaseTestModule,
            providers,
            exports: providers,
        };
    }
}