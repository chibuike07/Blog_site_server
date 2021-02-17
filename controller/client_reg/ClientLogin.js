const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  ClientSigninValidation,
} = require("../../middleware/Validators/ClientValidation/ClientSignInValidation");
const { ClientSignUp } = require("../../model/ClientSignUp");
const { Role } = require("../../util/Role");
const ClientGenerateToken = require("../../middleware/Authentication/ClientGenerateToken");

module.exports.postClientLogin = async (req, res, next) => {
  //getting email and password of the the user
  const { email, password } = req.body;
  const { USER_TOKEN_SECRETE, USER_TOKEN_KEY } = process.env; // getting the token secret

  //checking for error
  const { error } = ClientSigninValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  let clientLoggedInIpAddress = req.connection.remoteAddress.split(":")[3];

  //checking if email exist in the database
  const Client = await ClientSignUp.findOne({
    email: email,
    account_type: Role.CLIENT,
  });

  if (!Client) {
    return res.status(400).json({ message: "email or password incorrect" });
  }

  const isValid = await bcrypt.compare(password, Client.password);

  if (!isValid) {
    //verify using hash password
    return res.status(400).json({
      message: "password incorrect",
      status: "error",
    });
  }

  let updatedDocs = {
    loggedIn: true,
    ClientLoggedInIpAddress: clientLoggedInIpAddress,
    loginTime: mongoose.now(),
  };

  await ClientSignUp.updateOne(
    { email: email, loggedIn: "false", account_type: Role.CLIENT },
    {
      $set: updatedDocs,
    },
    { multi: true }
  );

  await ClientGenerateToken(res, Client._id, Client.account_type);
};
