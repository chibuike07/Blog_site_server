const AdminRegRouter = require("express").Router();
const { AdminPostSignUp } = require("../../controller/Admin_reg/adminSignUp");

AdminRegRouter.post("/admin_signup", AdminPostSignUp);

module.exports = { AdminRegRouter };
