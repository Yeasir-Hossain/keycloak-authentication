import Joi from 'joi';

// Validation schemas
export const registerValidation = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.messages({
			'string.email': 'Please provide a valid email address',
			'string.empty': 'Email is required',
			'any.required': 'Email is required'
		}),

	password: Joi.string(),
	// .min(8)
	// .required()
	// .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
	// .messages({
	// 	'string.min': 'Password must be at least 8 characters long',
	// 	'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	// 	'string.empty': 'Password is required',
	// 	'any.required': 'Password is required'
	// }),

	firstName: Joi.string()
		.required()
		.trim()
		.min(2)
		.max(50)
		.messages({
			'string.min': 'First name must be at least 2 characters long',
			'string.max': 'First name must not exceed 50 characters',
			'string.empty': 'First name is required',
			'any.required': 'First name is required'
		}),

	lastName: Joi.string()
		.required()
		.trim()
		.min(2)
		.max(50)
		.messages({
			'string.min': 'Last name must be at least 2 characters long',
			'string.max': 'Last name must not exceed 50 characters',
			'string.empty': 'Last name is required',
			'any.required': 'Last name is required'
		})
});

export const loginValidation = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.messages({
			'string.email': 'Please provide a valid email address',
			'string.empty': 'Email is required',
			'any.required': 'Email is required'
		}),

	password: Joi.string()
		.required()
		.messages({
			'string.empty': 'Password is required',
			'any.required': 'Password is required'
		})
});