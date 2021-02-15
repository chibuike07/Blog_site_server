const ClientResetPasswordRouter = require("express").Router();

const { ResetPassword } = require("../../controller/client_reg/ResetPassword");

ClientResetPasswordRouter.post("/reset_password/:token", ResetPassword);

module.exports = { ClientResetPasswordRouter };
