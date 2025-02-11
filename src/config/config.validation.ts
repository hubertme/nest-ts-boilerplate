import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(9000),
  GRPC_PORT: Joi.number().default(9002),
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),

  // Redis
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  REDIS_TLS_ENABLED: Joi.boolean().default(false),

  // Elasticsearch
  ELASTICSEARCH_NODE: Joi.string().default('http://localhost:9200'),
  ELASTICSEARCH_USERNAME: Joi.string().allow('').optional(),
  ELASTICSEARCH_PASSWORD: Joi.string().allow('').optional(),
  ELASTICSEARCH_TLS_ENABLED: Joi.boolean().default(false),

  // Rate limiting
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),
});
