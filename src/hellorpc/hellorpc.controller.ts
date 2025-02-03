import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import EnumRPCServices from '../../consts/enums/enum_rpc_services';
import { HelloRequest, HelloResponse } from './rpc/rpc_hellorpc';
import { HellorpcService } from './hellorpc.service';

@Controller('hellorpc')
export class HellorpcController {
    constructor(
        private readonly hellorpcService: HellorpcService
    ) {}

    @GrpcMethod(EnumRPCServices.HELLO_RPC_SERVICE, 'sendHello')
    async sendHello(data: HelloRequest): Promise<HelloResponse> {
        try {
            const result = this.hellorpcService.sendHello(data.name);
            const response: HelloResponse = {
                message: result,
            };
            return response;
        } catch (e) {
            console.log(e);
            throw new RpcException(e);
        }
    }
}
