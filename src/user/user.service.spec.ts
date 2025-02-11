import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRole, UserStatus } from '../proto/generated/user.pb';
import { RpcException } from '@nestjs/microservices';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const user = await service.createUser(
        'test@example.com',
        'password123',
        'Test User',
        UserRole.USER_ROLE_USER,
      );

      expect(user).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(user.fullName).toBe('Test User');
      expect(user.role).toBe(UserRole.USER_ROLE_USER);
      expect(user.status).toBe(UserStatus.USER_STATUS_ACTIVE);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });
  });

  describe('getUser', () => {
    it('should get an existing user', async () => {
      const created = await service.createUser(
        'test@example.com',
        'password123',
        'Test User',
        UserRole.USER_ROLE_USER,
      );

      const user = await service.getUser(created.id);
      expect(user).toBeDefined();
      expect(user.id).toBe(created.id);
    });

    it('should throw an exception for non-existent user', async () => {
      await expect(service.getUser('non-existent-id')).rejects.toThrow(RpcException);
    });
  });

  describe('updateUser', () => {
    it('should update user fields', async () => {
      const created = await service.createUser(
        'test@example.com',
        'password123',
        'Test User',
        UserRole.USER_ROLE_USER,
      );

      const updated = await service.updateUser(
        created.id,
        'updated@example.com',
        'Updated Name',
        UserRole.USER_ROLE_ADMIN,
        UserStatus.USER_STATUS_SUSPENDED,
      );

      expect(updated.email).toBe('updated@example.com');
      expect(updated.fullName).toBe('Updated Name');
      expect(updated.role).toBe(UserRole.USER_ROLE_ADMIN);
      expect(updated.status).toBe(UserStatus.USER_STATUS_SUSPENDED);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const created = await service.createUser(
        'test@example.com',
        'password123',
        'Test User',
        UserRole.USER_ROLE_USER,
      );

      await service.deleteUser(created.id);
      await expect(service.getUser(created.id)).rejects.toThrow(RpcException);
    });
  });

  describe('listUsers', () => {
    beforeEach(async () => {
      // Create test users
      await service.createUser('user1@example.com', 'pass1', 'User 1', UserRole.USER_ROLE_USER);
      await service.createUser('user2@example.com', 'pass2', 'User 2', UserRole.USER_ROLE_ADMIN);
      await service.createUser('user3@example.com', 'pass3', 'User 3', UserRole.USER_ROLE_USER);
    });

    it('should list users with pagination', async () => {
      const { users, nextPageToken, totalCount } = await service.listUsers(2, '');
      expect(users.length).toBe(2);
      expect(nextPageToken).toBeDefined();
      expect(totalCount).toBe(3);
    });

    it('should filter users by role', async () => {
      const { users, totalCount } = await service.listUsers(10, '', [UserRole.USER_ROLE_ADMIN]);
      expect(users.length).toBe(1);
      expect(totalCount).toBe(1);
      expect(users[0].role).toBe(UserRole.USER_ROLE_ADMIN);
    });
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      await service.createUser(
        'test@example.com',
        'password123',
        'Test User',
        UserRole.USER_ROLE_USER,
      );

      const result = await service.login('test@example.com', 'password123');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.expiresAt).toBeDefined();
    });

    it('should throw for invalid credentials', async () => {
      await expect(service.login('wrong@example.com', 'wrongpass')).rejects.toThrow(RpcException);
    });
  });
});