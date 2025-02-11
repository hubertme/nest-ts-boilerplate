import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User, UserRole, UserStatus } from '../proto/generated/user.pb';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserRestController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    schema: { $ref: getSchemaPath(UserDto) },
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.fullName,
      createUserDto.role,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    schema: { $ref: getSchemaPath(UserDto) },
  })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    schema: { $ref: getSchemaPath(UserDto) },
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userService.updateUser(
      id,
      updateData.email,
      updateData.fullName,
      updateData.role,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted.',
  })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users with pagination and filtering' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'pageToken', required: false })
  @ApiQuery({ name: 'roles', required: false, isArray: true, enum: UserRole })
  @ApiQuery({ name: 'statuses', required: false, isArray: true, enum: UserStatus })
  @ApiOkResponse({
    description: 'List of users retrieved successfully.',
    schema: { 
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: { $ref: getSchemaPath(UserDto) }
        },
        nextPageToken: { type: 'string' },
        totalCount: { type: 'number' }
      }
    },
  })
  async listUsers(
    @Query('pageSize') pageSize: number = 10,
    @Query('pageToken') pageToken: string = '',
    @Query('roles') roles?: UserRole[],
    @Query('statuses') statuses?: UserStatus[],
  ): Promise<{ users: User[]; nextPageToken: string; totalCount: number }> {
    return this.userService.listUsers(pageSize, pageToken, roles, statuses);
  }
}
