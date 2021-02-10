const ClientSignupRouter = require("express").Router();
const {
  ClientPostSignUp,
} = require("../../controller/client_reg/ClientSignUp");

ClientSignupRouter.post("/user_signup", ClientPostSignUp);

module.exports = { ClientSignupRouter };
