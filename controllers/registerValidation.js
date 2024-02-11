const Joi = require('joi');

const userValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    mobile: Joi.number().min(1000000000).max(9999999999).required().messages({
        "number.base": "Mobile must be a numeric value",
        "number.integer": "Mobile must be an integer",
        "number.min": "Mobile must be at least 10 digits",
        "number.max": "Mobile cannot exceed 10 digits",
        "any.required": "Mobile is required",
      }),
    email: Joi.string().email().required(),
});

module.exports = userValidation;
