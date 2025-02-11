import { Injectable } from '@nestjs/common';
import { User, UserRole, UserStatus } from '../proto/generated/user.pb';
import { v4 as uuidv4 } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class UserService {
  private users: Map<string, User> = new Map();

  async createUser(email: string, password: string, fullName: string, role: UserRole): Promise<User> {
    // In a real application, you would:
    // 1. Hash the password
    // 2. Validate email uniqueness
    // 3. Store in database
    // 4. Send welcome email
    
    const now = new Date();
    const user: User = {
      id: uuidv4(),
      email,
      fullName,
      role,
      status: UserStatus.USER_STATUS_ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(user.id, user);
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with ID ${id} not found`,
      });
    }
    return user;
  }

  async updateUser(
    id: string,
    email?: string,
    fullName?: string,
    role?: UserRole,
    status?: UserStatus,
  ): Promise<User> {
    const user = await this.getUser(id);
    
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (role) user.role = role;
    if (status) user.status = status;
    
    user.updatedAt = new Date();
    this.users.set(id, user);
    
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const exists = this.users.has(id);
    if (!exists) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with ID ${id} not found`,
      });
    }
    this.users.delete(id);
  }

  async listUsers(
    pageSize: number,
    pageToken: string,
    roles?: UserRole[],
    statuses?: UserStatus[],
  ): Promise<{ users: User[]; nextPageToken: string; totalCount: number }> {
    let filteredUsers = Array.from(this.users.values());

    if (roles?.length) {
      filteredUsers = filteredUsers.filter(user => roles.includes(user.role));
    }

    if (statuses?.length) {
      filteredUsers = filteredUsers.filter(user => statuses.includes(user.status));
    }

    const totalCount = filteredUsers.length;
    const startIndex = pageToken ? parseInt(pageToken, 10) : 0;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const hasNextPage = endIndex < totalCount;

    return {
      users: filteredUsers.slice(startIndex, endIndex),
      nextPageToken: hasNextPage ? endIndex.toString() : '',
      totalCount,
    };
  }

  // In a real application, you would:
  // 1. Validate credentials
  // 2. Generate JWT tokens
  // 3. Store refresh tokens
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; expiresAt: Date }> {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    if (!user) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid credentials',
      });
    }

    return {
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    };
  }

  async logout(accessToken: string): Promise<void> {
    // In a real application, you would:
    // 1. Validate the token
    // 2. Add it to a blacklist or remove from storage
    // 3. Clear any associated sessions
  }
}
