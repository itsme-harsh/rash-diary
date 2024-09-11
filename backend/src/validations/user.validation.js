import Joi from "joi";

const gmailPattern = /^[^\s@]+@gmail\.com$/;

const registerSchema = Joi.object({
    avatar: Joi.string().optional(),
    coverImage: Joi.string().optional(),
    username: Joi.string().min(5).max(30).required().messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be less than 30 characters long',
        'any.required': 'Username is required',
    }),
    email: Joi.string()
    .pattern(gmailPattern)  // Ensure email ends with @gmail.com
    .email()  // Ensure it's a valid email format
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.pattern.base': 'Only Gmail addresses are allowed.',
      'string.email': 'Email must be a valid email address.',
      'any.required': 'Email is required.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 8 characters long'
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))  // Ensure that confirmPassword matches password
    .required()
    .messages({
        'string.base': 'Confirm Password must be a string',
        'string.empty': 'Confirm Password is required',
        'any.only': 'Confirm Password must match Password',
        'any.required':'Confirm Password is required'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().optional().pattern(gmailPattern).messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'string.empty':"Email is required",
        'string.pattern.base': 'Only Gmail addresses are allowed.',
        'any.unknown': 'Email cannot be provided with a username'
    }),

username: Joi.string().optional().messages({
        'string.base': 'Username must be a string',
        'string.empty':"Username is required",
        'any.unknown': 'Username cannot be provided with an email'
    }),

password: Joi.string()
    .min(8)
    .required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    })
})
.or('email', 'username').messages({
    'object.missing': 'Please enter username or email'
});

export { loginSchema, registerSchema };

