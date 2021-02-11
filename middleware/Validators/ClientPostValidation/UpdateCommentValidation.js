const Joi = require("joi");

module.exports.UpdateCommentValidation = Joi.object({
  message: Joi.string().empty().trim(true).required(),
});
