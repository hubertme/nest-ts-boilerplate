/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "rpc_hellorpc";

export interface HelloRequest {
  name: string;
}

export interface HelloResponse {
  message: string;
}

export const RPC_HELLORPC_PACKAGE_NAME = "rpc_hellorpc";

export interface HelloRpcServiceClient {
  sendHello(request: HelloRequest, metadata?: Metadata): Observable<HelloResponse>;
}

export interface HelloRpcServiceController {
  sendHello(
    request: HelloRequest,
    metadata?: Metadata,
  ): Promise<HelloResponse> | Observable<HelloResponse> | HelloResponse;
}

export function HelloRpcServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HelloRpcService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HelloRpcService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HELLO_RPC_SERVICE_NAME = "HelloRpcService";
