import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'prom-client';
import { Request, Response } from 'express';
import ServerResponse from '../responses/server_responses';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/metrics')
    async getMetrics(@Req() req: Request, @Res() res: Response) {
        try {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        } catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                ServerResponse.GeneralError(e),
            );
        }
    }
}
