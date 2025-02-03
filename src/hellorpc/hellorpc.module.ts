import { Module } from '@nestjs/common';
import { HellorpcController } from './hellorpc.controller';
import { HellorpcService } from './hellorpc.service';

@Module({
  controllers: [HellorpcController],
  providers: [HellorpcService]
})
export class HellorpcModule {}
