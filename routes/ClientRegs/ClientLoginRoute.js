const { postClientLogin } = require("../../controller/client_reg/ClientLogin");

const ClientLoginRouter = require("express").Router();

ClientLoginRouter.post("/client/login", postClientLogin);

module.exports = { ClientLoginRouter };
