const Joi = require("joi");

module.exports.ClientForGotPasswordValidation = Joi.object({
  email: Joi.string().empty().trim(true).required().email(),
});
