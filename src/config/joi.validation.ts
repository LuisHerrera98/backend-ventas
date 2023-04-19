import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
    DATABASE_MONGO_URI: Joi.required(),
    PORT: Joi.number().default(3001),
    SECRET_KEY: Joi.required(),
})