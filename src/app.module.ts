import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HellorpcModule } from './hellorpc/hellorpc.module';
import { ExrouteModule } from './exroute/exroute.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import AppConfig from '../app_config';
import { configValidationSchema } from './config/config.validation';

@Module({
    imports: [
        // Configure dotenv with validation
        ConfigModule.forRoot({
            envFilePath: AppConfig.envFilePath,
            isGlobal: true,
            validationSchema: configValidationSchema,
        }),
        // Rate limiting
        ThrottlerModule.forRoot({
            ttl: parseInt(process.env.THROTTLE_TTL) || 60,
            limit: parseInt(process.env.THROTTLE_LIMIT) || 100,
        }),
        HellorpcModule,
        ExrouteModule,
        HealthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
