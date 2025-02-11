import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { GrpcAuthGuard } from '../auth/grpc.guard';
import { GrpcLoggingInterceptor } from '../interceptors/grpc-logging.interceptor';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  ListUsersRequest,
  ListUsersResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  UpdateUserRequest,
  User,
} from '../proto/generated/user.pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

@Controller()
@UseInterceptors(GrpcLoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Login')
  async login(request: LoginRequest): Promise<LoginResponse> {
    const { accessToken, refreshToken, expiresAt } = await this.userService.login(
      request.email,
      request.password,
    );
    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  @GrpcMethod('UserService', 'Logout')
  async logout(request: LogoutRequest): Promise<Empty> {
    await this.userService.logout(request.accessToken);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest): Promise<User> {
    return this.userService.createUser(
      request.email,
      request.password,
      request.fullName,
      request.role,
    );
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<User> {
    return this.userService.getUser(request.id);
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(request: UpdateUserRequest): Promise<User> {
    return this.userService.updateUser(
      request.id,
      request.email,
      request.fullName,
      request.role,
      request.status,
    );
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(request: DeleteUserRequest): Promise<Empty> {
    await this.userService.deleteUser(request.id);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'ListUsers')
  async listUsers(request: ListUsersRequest): Promise<ListUsersResponse> {
    const { users, nextPageToken, totalCount } = await this.userService.listUsers(
      request.pageSize,
      request.pageToken,
      request.roles,
      request.statuses,
    );
    return {
      users,
      nextPageToken,
      totalCount,
    };
  }
}