import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from '../app_config';
import { Transport } from '@nestjs/microservices';
import { RPC_HELLORPC_PACKAGE_NAME } from './hellorpc/rpc/rpc_hellorpc';
import * as path from 'path';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

async function runRest() {
    const app = await NestFactory.create(AppModule);

    // Security middleware
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );
    app.enableCors({
        origin: '*', // In production, replace with actual allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));

    const port = process.env.PORT;
    await app.listen(port, '0.0.0.0', () => {
        if (!AppConfig.isProduction) {
            console.log('Running on PORT:', port);
        }
    });
}

async function runGrpc() {
    const port = process.env.GRPC_PORT;
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: `0.0.0.0:${port}`,
            package: RPC_HELLORPC_PACKAGE_NAME,
            protoPath: path.join(__dirname, `../hellorpc/rpc/rpc_hellorpc.proto`),
        },
    });
    console.log('gRPC running on port:', port);
    await app.listen();
}

async function run() {
    await AppConfig.init();

    runRest();
    runGrpc();
}
run();