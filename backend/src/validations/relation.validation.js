import Joi from 'joi';

// Regular expression to allow only alphabetic characters and spaces
const alphabeticPattern = /^[A-Za-z\s]+$/;

const relationRegisterSchema = Joi.object({
    name: Joi.string().min(3).required()
        .pattern(alphabeticPattern)
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must be at least 3 character long.',
            'string.pattern.base': 'Name must contain only alphabetic characters and spaces.',
            'any.required': 'Name is required.'
        }),

    description: Joi.string().allow('')
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description can be an empty string.'
        }),

    birthdayReminder: Joi.boolean().default(false)
        .messages({
            'boolean.base': 'Birthday reminder must be a boolean value.'
        })
});

const relationUpdateSchema = Joi.object({
    name: Joi.string().min(3).optional()
        .pattern(alphabeticPattern)
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must be at least 3 characters long.',
            'string.pattern.base': 'Name must contain only alphabetic characters and spaces.',
        }),

    description: Joi.string().allow('').optional()
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description can be an empty string.'
        }),

    birthdayReminder: Joi.boolean().default(false).optional()
        .messages({
            'boolean.base': 'Birthday reminder must be a boolean value.'
        })
});


// Export the Joi schema
export { relationRegisterSchema, relationUpdateSchema };
