import Joi from 'joi';

// Define the Joi schema for validating People documents
const peopleRegisterSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)  // Regular expression to allow only letters and spaces
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.pattern.base': 'Name cannot contain numbers.',
      'any.required': 'Name is required.'
    }),
  relationId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)  // Validates ObjectId format
    .required()
    .messages({
      'string.base': 'Relation ID must be a string.',
      'string.empty': 'Relation ID is required.',
      'string.pattern.base': 'Invalid Relation ID format.',
      'any.required': 'Relation ID is required.'
    }),
  dob: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Date of birth must be a valid date.',
      'date.isoDate': 'Date of birth must be a valid ISO date format.'
    }),
  reminder: Joi.boolean()
    .default(true)
    .optional()
    .messages({
      'boolean.base': 'Reminder must be a boolean value.',
    }),
  status: Joi.string()
    .optional()
    .messages({
      'string.base': 'Status must be a string.'
    }),
  type: Joi.string()
    .optional()
    .messages({
      'string.base': 'Type must be a string.'
    }),
  city: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)  // Regular expression to allow only letters and spaces
    .optional()
    .messages({
      'string.base': 'City must be a string.',
      'string.pattern.base': 'City cannot contain numbers.'
    })
});

export {
  peopleRegisterSchema
}