# NestJS TypeScript Boilerplate

A production-ready NestJS boilerplate with TypeScript, featuring both REST and gRPC support, comprehensive security features, and best practices implementation.

## Features

### Architecture
- 🚀 NestJS framework with TypeScript
- 🔄 Dual protocol support (REST & gRPC)
- 🎯 Modular architecture design
- 📦 TypeORM integration ready
- 🔍 OpenAPI (Swagger) documentation

### Security
- 🔒 Helmet security middleware
- 🚦 Rate limiting and request throttling
- 🔑 JWT authentication support
- 🛡️ CORS protection
- 🔐 Environment validation
- 📝 Request/Response logging with sensitive data redaction

### Monitoring & Health
- 💓 Health check endpoints
- 📊 Prometheus metrics
- 🔍 Elasticsearch integration
- 📝 Structured logging

### Development Tools
- 🧪 Comprehensive testing setup (Unit & E2E)
- 🐳 Docker support with multi-stage builds
- 🔄 Hot reload in development
- 📋 ESLint + Prettier configuration
- 🏗️ CI/CD ready

## Getting Started

### Prerequisites
- Node.js (v20 or later)
- npm or yarn
- Docker (optional)
- Protocol Buffers compiler (for gRPC)

### Installation

```bash
# Clone the repository
git clone https://github.com/hubertme/nest-ts-boilerplate.git

# Install dependencies and prepare environment
npm run prepare:dev

# Start the development server
npm run start:dev
```

### Docker Setup

```bash
# Build and run using npm scripts
npm run docker:build
npm run docker:run

# Or manually with Docker commands
docker build -t nest-ts-boilerplate .
docker run -p 9000:9000 -p 9002:9002 nest-ts-boilerplate
```

## Development Guide

### Creating New Modules

```bash
# Generate just a module
npm run generate:module MODULE_NAME

# Generate a complete module with controller and service
npm run generate:full-module MODULE_NAME

# Or manually using NestJS CLI:
nest g mo MODULE_NAME && nest g co MODULE_NAME && nest g s MODULE_NAME
```

### Working with gRPC

#### Generate TypeScript Definitions from Proto Files

```bash
# Generate TypeScript definitions from proto files
npm run proto:gen

# The script uses the following protoc options:
# - nestJs=true: Generate NestJS-compatible code
# - fileSuffix=.pb: Use .pb suffix for generated files
# - esModuleInterop=true: Better ES module compatibility
# - outputEncodeMethods=false: Reduce generated code size
# - outputJsonMethods=false: Reduce generated code size
# - outputClientImpl=false: No client implementation
```

### Environment Configuration

The application uses a hierarchical configuration system:

1. Default values in code
2. Environment-specific .env files
3. Runtime environment variables

Available environments:
- Development: \`.dev.env\`
- Production: \`.prod.env\`
- Test: \`.test.env\`

### Security Best Practices

1. **Authentication**
   - JWT tokens for REST APIs
   - gRPC metadata for authentication
   - Token refresh mechanism

2. **Rate Limiting**
   - Default: 100 requests per minute
   - Configurable through environment variables

3. **CORS**
   - Configured for development
   - Production should specify allowed origins

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

### REST API
- OpenAPI documentation available at \`/api/docs\`
- Swagger UI for interactive testing

### gRPC Services
- User Service (Authentication, CRUD operations)
- Health Service
- Additional services (see proto files)

## Deployment

### Production Considerations
1. Set appropriate environment variables
2. Enable production mode
3. Configure proper CORS settings
4. Set up monitoring and logging
5. Configure proper SSL/TLS

### Health Checks
- REST endpoint: \`/health\`
- gRPC health service
- Includes dependency checks (Redis, Elasticsearch)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NestJS team for the excellent framework
- Contributors and maintainers
- Community feedback and suggestions