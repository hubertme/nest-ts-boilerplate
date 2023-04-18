import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HellorpcModule } from './hellorpc/hellorpc.module';
import AppConfig from '../app_config';

@Module({
    imports: [
        // Configure dotenv
        ConfigModule.forRoot({
            envFilePath: AppConfig.envFilePath,
            isGlobal: true,
        }),
        HellorpcModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
