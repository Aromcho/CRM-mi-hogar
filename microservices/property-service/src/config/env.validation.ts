import Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required().messages({
    'string.uri': 'MONGO_URI debe ser una URL válida.',
    'any.required': 'MONGO_URI es un campo requerido.',
  }),
  PORT: Joi.number().default(4001),
});

export default () => ({
  MONGO_URI: process.env.MONGO_URI || '',
  PORT: parseInt(process.env.PORT || '4002', 10),
});