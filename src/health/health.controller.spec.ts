import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService, HttpHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should check health', async () => {
    const mockHealthCheck = {
      status: 'ok',
      info: {
        'nestjs-docs': {
          status: 'up',
        },
      },
      error: {},
      details: {
        'nestjs-docs': {
          status: 'up',
        },
      },
    };

    jest.spyOn(healthService, 'check').mockResolvedValue(mockHealthCheck);

    const result = await controller.check();
    expect(result).toEqual(mockHealthCheck);
    expect(healthService.check).toHaveBeenCalled();
  });
});