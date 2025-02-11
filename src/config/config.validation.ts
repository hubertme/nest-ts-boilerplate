import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(9000),
  GRPC_PORT: Joi.number().default(9002),
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),

  // Redis
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),
  REDIS_TLS_ENABLED: Joi.boolean().default(false),

  // Elasticsearch
  ELASTICSEARCH_NODE: Joi.string().required(),
  ELASTICSEARCH_USERNAME: Joi.string().optional(),
  ELASTICSEARCH_PASSWORD: Joi.string().optional(),
  ELASTICSEARCH_TLS_ENABLED: Joi.boolean().default(false),

  // Rate limiting
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),
});