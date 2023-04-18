# bayaraja-be-rpc-campaign
BayarAja Campaign RPC


# Commands
## Create new service
`nest g mo MODULE_NAME && nest g co MODULE_NAME --no-spec && nest g s MODULE_NAME --no-spec`


## Generate RPC Typescript Definition
TS proto version:<br>
`protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./src/**/*.proto`

Building a simpler version:<br>
`protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./src/**/*.proto --ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false`

**Recommended** NestJS version:<br>
`protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./src/**/*.proto --ts_proto_opt=nestJs=true,addGrpcMetadata=true,forceLong=string`

Using @grpc/proto-loader:<br>
`./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=./src/rpcdef ./src/**/*.proto`