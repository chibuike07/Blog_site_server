const Joi = require("joi");

module.exports.ClientResetPasswordValidatioon = Joi.object({
  email: Joi.string().empty().trim(true).required().email(),
  password: Joi.string().empty().trim(true).required(),
});
