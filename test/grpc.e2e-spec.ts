import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { AppModule } from '../src/app.module';
import { join } from 'path';
import { UserRole } from '../src/proto/generated/user.pb';
import { firstValueFrom } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';

interface UserService {
  createUser(request: any): Promise<any>;
  getUser(request: any): Promise<any>;
  login(request: any): Promise<any>;
}

describe('gRPC User Service (e2e)', () => {
  let app: INestApplication;
  let client: ClientGrpc;
  let userService: UserService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'USER_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: '0.0.0.0:51029',
              package: 'user',
              protoPath: join(__dirname, '../src/proto/user.proto'),
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(51029);

    client = app.get('USER_PACKAGE');
    userService = client.getService<UserService>('UserService');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle login successfully', async () => {
    const response = await firstValueFrom(
      userService.login({
        email: 'test@example.com',
        password: 'password123',
      }),
    );

    expect(response.accessToken).toBeDefined();
    expect(response.refreshToken).toBeDefined();
    expect(response.expiresAt).toBeDefined();

    authToken = response.accessToken;
  });

  it('should create a user with valid auth token', async () => {
    const metadata = new Metadata();
    metadata.add('authorization', `Bearer ${authToken}`);

    const response = await firstValueFrom(
      userService.createUser(
        {
          email: 'newuser@example.com',
          password: 'newpass123',
          fullName: 'New User',
          role: UserRole.USER_ROLE_USER,
        },
        metadata,
      ),
    );

    expect(response.id).toBeDefined();
    expect(response.email).toBe('newuser@example.com');
    expect(response.fullName).toBe('New User');
    expect(response.role).toBe(UserRole.USER_ROLE_USER);
  });

  it('should fail to create user without auth token', async () => {
    try {
      await firstValueFrom(
        userService.createUser({
          email: 'another@example.com',
          password: 'pass123',
          fullName: 'Another User',
          role: UserRole.USER_ROLE_USER,
        }),
      );
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.code).toBe(status.UNAUTHENTICATED);
    }
  });

  it('should get user with valid auth token', async () => {
    const metadata = new Metadata();
    metadata.add('authorization', `Bearer ${authToken}`);

    // First create a user
    const created = await firstValueFrom(
      userService.createUser(
        {
          email: 'getuser@example.com',
          password: 'pass123',
          fullName: 'Get User',
          role: UserRole.USER_ROLE_USER,
        },
        metadata,
      ),
    );

    // Then get the user
    const response = await firstValueFrom(
      userService.getUser({ id: created.id }, metadata),
    );

    expect(response.id).toBe(created.id);
    expect(response.email).toBe('getuser@example.com');
  });
});