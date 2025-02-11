# Swagger Documentation Guide

## Overview
This project uses Swagger/OpenAPI for automatic API documentation. The documentation is automatically generated from your code using decorators and is accessible through a web interface.

## Accessing the Documentation
- Development: `http://localhost:9000/api/docs`
- Production: `https://api.example.com/api/docs`

## Features
- Interactive API testing
- Bearer token authentication support
- Request/Response schema documentation
- Example values and descriptions
- API versioning support
- Automatic schema generation from DTOs

## Adding Documentation

### 1. Controller Documentation
```typescript
// Group your endpoints
@ApiTags('users')
@Controller('users')
export class UserController {
  // Document operations
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {}

  // Document parameters
  @ApiParam({
    name: 'id',
    description: 'The user ID',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {}

  // Document query parameters
  @ApiQuery({
    name: 'role',
    enum: UserRole,
    required: false,
  })
  @Get()
  findAll(@Query('role') role?: UserRole) {}
}
```

### 2. DTO Documentation
```typescript
export class CreateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address',
    format: 'email',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.USER,
    description: 'The user role',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
```

### 3. Security Documentation
```typescript
// Controller or method level
@ApiBearerAuth()
@ApiHeader({
  name: 'X-API-KEY',
  description: 'API Key for authentication',
})
@ApiSecurity('api_key')
```

### 4. Response Documentation
```typescript
@ApiOkResponse({
  description: 'User found successfully',
  type: User,
})
@ApiNotFoundResponse({
  description: 'User not found',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
```

## Best Practices

1. **Group Related Endpoints**
   - Use `@ApiTags` to organize endpoints logically
   - Keep tag names consistent across controllers

2. **Document All Parameters**
   - Use `@ApiProperty` for DTO fields
   - Include examples where helpful
   - Specify data types and validation rules

3. **Response Documentation**
   - Document all possible response codes
   - Include response schemas
   - Provide examples for complex responses

4. **Security**
   - Document authentication requirements
   - Specify required headers or tokens
   - Include permission requirements

5. **Maintenance**
   - Keep documentation in sync with code
   - Update examples when APIs change
   - Review and update descriptions regularly

## Configuration
The Swagger configuration is in `main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('NestJS TypeScript Boilerplate')
  .setDescription('REST API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('health', 'Health check endpoints')
  .addTag('users', 'User management endpoints')
  .addServer(process.env.NODE_ENV === 'production' 
    ? 'https://api.example.com' 
    : 'http://localhost:' + process.env.PORT)
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document, {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'NestJS API Docs',
});
```

## Automatic Updates
The documentation is automatically updated when you:
- Add new controllers/routes
- Modify DTOs
- Update API descriptions
- Change authentication methods
- Add new examples or descriptions

No additional build steps are required - the documentation updates in real-time as your application runs.
