import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from '../app_config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await AppConfig.init();

    const port = process.env.PORT;
    await app.listen(port, '0.0.0.0', () => {
        if (!AppConfig.isProduction) {
            console.log('Running on PORT:', port);
        }
    });
}
bootstrap();
