import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HellorpcModule } from './hellorpc/hellorpc.module';
import { ExrouteModule } from './exroute/exroute.module';
import AppConfig from '../app_config';

@Module({
    imports: [
        // Configure dotenv
        ConfigModule.forRoot({
            envFilePath: AppConfig.envFilePath,
            isGlobal: true,
        }),
        HellorpcModule,
        ExrouteModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
