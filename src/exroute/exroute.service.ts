import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import NetworkingUtil from '../../utils/networking_util';
import { HelloRequest, HelloRpcServiceClient } from '../hellorpc/rpc/rpc_hellorpc';
import EnumRPCCodenames from '../../consts/enums/enum_rpc_codenames';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExrouteService implements OnModuleInit {
    private helloRPCClient: HelloRpcServiceClient;

    constructor(
        @Inject(EnumRPCCodenames.HELLORPC) private readonly client: ClientGrpc,
    ) {}
    onModuleInit() {
        this.helloRPCClient = this.client.getService<HelloRpcServiceClient>('HelloRpcService');
    }

    async sendHello(name: string): Promise<string> {
        const req: HelloRequest = {
            name,
        }
        const resp = await lastValueFrom(this.helloRPCClient.sendHello(req));
        return resp.message;
    }
}
