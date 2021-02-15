const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  ClientSigninValidation,
} = require("../../middleware/Validators/ClientValidation/ClientSignInValidation");
const { ClientSignUp } = require("../../model/ClientSignUp");

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
  const Client = await ClientSignUp.findOne({ email: email });

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

  await ClientSignUp.updateMany(
    { email: email, loggedIn: "false" },
    {
      $set: updatedDocs,
    },
    { multi: true }
  );

  //signing a token that will expire every 24hours

  const token = jwt.sign(
    { _id: Client._id, role: Client.account_type },
    USER_TOKEN_SECRETE,
    {
      expiresIn: "24h", // expires in 24 hours
    }
  );

  //checking if the header holds the token and sending the token to the vendor
  res
    .cookie(USER_TOKEN_KEY, token, {
      expires: new Date(new Date() + 86400000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    })
    .json({
      message: "login successful",
      status: "success",
      token,
    });
};
