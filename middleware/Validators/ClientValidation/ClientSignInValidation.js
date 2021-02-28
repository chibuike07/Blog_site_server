const Joi = require("joi");

module.exports.ClientSigninValidation = Joi.object({
  email: Joi.string().empty().trim(true).required().email(),
  password: Joi.string().empty().trim(true).required(),
});
