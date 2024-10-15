import Joi from 'joi';

// Custom validation function to ensure no numbers and each word contains at least 3 characters
const noNumbersAndMinLength = (value, helpers) => {
    const words = value.trim().split(' ');

    if (words.length > 2) {
        return helpers.message(`{{#label}} must contain only 2 words`);
    }

    for (const word of words) {
        if (word.length < 3) {
            return helpers.message(`Each word in {{#label}} must be at least 3 characters long`);
        }
        if (/\d/.test(word)) {
            return helpers.message(`Numbers are not allowed in {{#label}}`);
        }
    }

    return value;
};

// Define the Joi schema
const WishSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .custom(noNumbersAndMinLength, 'Custom validation')
        .messages({
            'string.empty': 'Name is required',
        }),

    relation: Joi.string()
        .required()
        .trim()
        .custom(noNumbersAndMinLength, 'Custom validation')
        .messages({
            'string.empty': 'Relation is required',
        }),

    type: Joi.string()
        .required()
        .trim()
        .custom(noNumbersAndMinLength, 'Custom validation')
        .messages({
            'string.empty': 'Type is required',
        }),
});

export {
    WishSchema
}

