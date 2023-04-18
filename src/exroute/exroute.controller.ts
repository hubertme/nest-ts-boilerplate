import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ExrouteService } from './exroute.service';
// Import express Request and Response
import { Request, Response } from 'express';
import ServerResponse from '../../responses/server_responses';
import { SendHelloRequest } from './exroute.models';

@Controller('exroute')
export class ExrouteController {
    constructor(
        private readonly exrouteService: ExrouteService,
    ) {}

    @Post('/hello')
    async sendHello(@Req() req: Request, @Res() res: Response) {
        try {
            const body = SendHelloRequest.fromJson(req.body);
            const result = await this.exrouteService.sendHello(body.name);
            res.status(HttpStatus.OK).json(
                ServerResponse.Success(result),
            );
        } catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                ServerResponse.GeneralError(e),
            );
        }
    }
}
