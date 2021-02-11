const Joi = require("joi");

module.exports.ClientPostValidation = Joi.object({
  title: Joi.string().empty().trim(true).required(),
  body: Joi.string().empty().trim(true).required(),
});
