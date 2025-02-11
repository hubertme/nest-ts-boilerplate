import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import helmet from 'helmet';

describe('Security (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(helmet());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should have security headers', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
        expect(res.headers['x-xss-protection']).toBe('0');
        expect(res.headers['x-content-type-options']).toBe('nosniff');
        expect(res.headers['x-dns-prefetch-control']).toBe('off');
      });
  });

  it('should have CORS headers', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.headers['access-control-allow-origin']).toBe('*');
      });
  });

  it('should enforce rate limiting', async () => {
    const requests = Array(150).fill(null);
    const responses = await Promise.all(
      requests.map(() =>
        request(app.getHttpServer())
          .get('/')
          .then((res) => res.status)
          .catch((err) => err.status),
      ),
    );

    const tooManyRequests = responses.filter((status) => status === 429);
    expect(tooManyRequests.length).toBeGreaterThan(0);
  });

  describe('/health (GET)', () => {
    it('should return 200 and health check data', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status');
          expect(res.body).toHaveProperty('info');
          expect(res.body.status).toBe('ok');
        });
    });
  });
});