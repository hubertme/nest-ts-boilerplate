#!/bin/bash

# Create the output directory if it doesn't exist
mkdir -p src/proto/generated

# Generate TypeScript code from proto files
protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=src/proto/generated \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=fileSuffix=.pb \
  --ts_proto_opt=esModuleInterop=true \
  --ts_proto_opt=outputEncodeMethods=false \
  --ts_proto_opt=outputJsonMethods=false \
  --ts_proto_opt=outputClientImpl=false \
  --proto_path=src/proto \
  src/proto/*.proto
