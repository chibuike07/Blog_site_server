const ClientUpdateSpecifiedPostRouter = require("express").Router();
const {
  ClientVerifyAuth,
} = require("../../middleware/Authentication/ClientVerifyAuth");

const { updatePost } = require("../../controller/ClientPostRequest/updateText");

ClientUpdateSpecifiedPostRouter.put("/post/:id", ClientVerifyAuth, updatePost);

module.exports = {
  ClientUpdateSpecifiedPostRouter,
};
