const ClientForgetPasswordRouter = require("express").Router();

const {
  forgotPassword,
} = require("../../controller/client_reg/ForgotPassword");

ClientForgetPasswordRouter.post("/replace_password", forgotPassword);

module.exports = { ClientForgetPasswordRouter };
