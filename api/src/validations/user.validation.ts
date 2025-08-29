import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Last name is required',
  }),
  participationPercentage: Joi.number().min(1).max(100).required().messages({
    'number.base': 'Participation must be a number',
    'number.min': 'Participation must be at least 1%',
    'number.max': 'Participation cannot exceed 100%',
    'any.required': 'Participation is required',
  }),
});
