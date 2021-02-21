const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { ClientSignUp } = require("../../model/ClientSignUp");
const {
  ClientForGotPasswordValidation,
} = require("../../middleware/Validators/ClientValidation/ClientForGotPassword");
const { ResetEmail } = require("../../util/ForgotPassword");

module.exports.forgotPassword = async (req, res, next) => {
  //getting email and password of the the user
  const { email } = req.body;

  //checking for error
  const { error } = ClientForGotPasswordValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  const generatedToken = crypto.randomBytes(32);

  if (!generatedToken) {
    return res.status(400).json({
      message: "error while trying to generate token",
      status: "error",
    });
  }

  const convertTokenToHexString = generatedToken.toString("hex");

  //checking if email exist in the database
  const Client = await ClientSignUp.findOne({ email: email });

  if (!Client) {
    return res.status(404).json({ message: "Email does not exist" });
  }

  Client.resetToken = convertTokenToHexString;
  Client.expireToken = Date.now() + 36000000;
  const saveToken = await Client.save();

  if (!saveToken) {
    return res.status(401).json({
      message: "error occured while trying to save the token",
      status: "error",
    });
  }
  ResetEmail(Client.email, req, Client.resetToken, res);

  return res.status(200).json({
    message: "A message has been sent to your email",
    status: "success",
  });
};
