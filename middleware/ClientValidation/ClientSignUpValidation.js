const Joi = require("joi");

module.exports.ClientSignUpValidation = Joi.object({
  firstName: Joi.string().empty().trim(true).required(),
  lastName: Joi.string().empty().trim(true).required(),
  email: Joi.string().empty().trim(true).required().email(),
  password: Joi.string().empty().trim(true).required(),
});
