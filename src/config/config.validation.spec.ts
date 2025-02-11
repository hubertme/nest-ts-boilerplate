import { configValidationSchema } from './config.validation';

describe('Config Validation', () => {
  it('should validate required environment variables', async () => {
    const validConfig = {
      PORT: 9000,
      GRPC_PORT: 9002,
      NODE_ENV: 'dev',
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
      ELASTICSEARCH_NODE: 'http://localhost:9200',
    };

    const { error, value } = configValidationSchema.validate(validConfig);
    expect(error).toBeUndefined();
    expect(value).toEqual({
      ...validConfig,
      REDIS_PASSWORD: '',
      REDIS_TLS_ENABLED: false,
      ELASTICSEARCH_USERNAME: '',
      ELASTICSEARCH_PASSWORD: '',
      ELASTICSEARCH_TLS_ENABLED: false,
      THROTTLE_TTL: 60,
      THROTTLE_LIMIT: 100,
    });
  });

  it('should fail on missing required variables', async () => {
    const invalidConfig = {
      PORT: 9000,
      // Missing REDIS_HOST and ELASTICSEARCH_NODE
    };

    const { error } = configValidationSchema.validate(invalidConfig);
    expect(error).toBeDefined();
    expect(error.details.length).toBeGreaterThan(0);
  });

  it('should validate NODE_ENV values', async () => {
    const invalidConfig = {
      ...getValidConfig(),
      NODE_ENV: 'invalid',
    };

    const { error } = configValidationSchema.validate(invalidConfig);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('NODE_ENV');
  });

  it('should validate port numbers', async () => {
    const invalidConfig = {
      ...getValidConfig(),
      PORT: 'invalid',
    };

    const { error } = configValidationSchema.validate(invalidConfig);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('PORT');
  });
});

function getValidConfig() {
  return {
    PORT: 9000,
    GRPC_PORT: 9002,
    NODE_ENV: 'dev',
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    ELASTICSEARCH_NODE: 'http://localhost:9200',
  };
}