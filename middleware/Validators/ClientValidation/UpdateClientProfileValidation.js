const Joi = require("joi");

module.exports.profileUpdateValidation = Joi.object({
  firstName: Joi.string().empty().trim(true),
  lastName: Joi.string().empty().trim(true),
  email: Joi.string().empty().trim(true).min(10).max(40).email(),
  phone: Joi.string().empty().trim(true).min(11).max(11),
  address: Joi.string().empty().trim(true).min(10).max(30),
  city: Joi.string().empty().trim(true).min(10).max(30),
  state: Joi.string().empty().trim(true).min(10).max(30),
  posts: Joi.number().empty(),
  ClientLoggedInIpAddress: Joi.string().empty().trim(true).max(12),
  contact: Joi.object().empty(),
});
