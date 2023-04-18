import { Module } from '@nestjs/common';
import { ExrouteController } from './exroute.controller';
import { ExrouteService } from './exroute.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';
import EnumRPCCodenames from '../../consts/enums/enum_rpc_codenames';

@Module({
    controllers: [ExrouteController],
    providers: [ExrouteService],
    imports: [
        ClientsModule.register([
            {
                name: EnumRPCCodenames.HELLORPC,
                transport: Transport.GRPC,
                options: {
                    url: 'localhost:9002',
                    package: EnumRPCCodenames.HELLORPC,
                    protoPath: path.join(__dirname, '../../hellorpc/rpc/rpc_hellorpc.proto'),
                },
            }
        ])
    ]
})
export class ExrouteModule { }
