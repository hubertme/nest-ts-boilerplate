import { Injectable } from '@nestjs/common';

@Injectable()
export class HellorpcService {
    sendHello(name: string): string {
        return `Hello ${name}!`;
    }
}
