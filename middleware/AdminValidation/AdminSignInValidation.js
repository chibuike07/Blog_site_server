const Joi = require("joi");

module.exports.AdminSigninValidation = Joi.object({
  email: Joi.string().empty().trim(true).required(),
  password: Joi.string().empty().trim(true).required(),
});
