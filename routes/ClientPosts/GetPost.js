
const { getPost } = require("../../controller/ClientPostRequest/getPostTest");

const ClientGetPostRouter = require("express").Router();

ClientGetPostRouter.get("/post", getPost);

module.exports = { ClientGetPostRouter };
