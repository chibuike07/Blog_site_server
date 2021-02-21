const bcrypt = require("bcryptjs");

const { ClientSignUp } = require("../../model/ClientSignUp");
const { ResetPasswordMessage } = require("../../util/ResetPasswordMessage");

const {
  ClientResetPasswordValidatioon,
} = require("../../middleware/Validators/ClientValidation/ClientResetPasswordValidation");

exports.ResetPassword = async (req, res, next) => {
  //destructure the req body
  const { email, password } = req.body;
  const { token } = req.params;

  //checking for error
  const { error } = ClientResetPasswordValidatioon.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //checking if email exist
  const emailExist = await ClientSignUp.findOne({
    email: email,
    resetToken: token,
  });

  if (!emailExist) {
    return res.status(404).json({
      message: "no match was found!",
      status: "error",
    });
  }

  if (emailExist.length < 1) {
    return res.status(500).json({
      message: "please check to see that you followed the right link.",
      status: "error",
    });
  }
  //assigning the salt to use
  const saltR = 10;

  bcrypt.genSalt(saltR, async (err, salt) => {
    if (err) {
      return res.status(400).json({
        message: "unathorized  error",
        status: "error",
      });
    } else {
      //hashing the password
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(403).json({
            message: "user validation failed",
            status: "error",
          });
        } else {
          const client = ClientSignUp.updateOne(
            {
              //creating an update to client password
              email: email,
            },
            { $set: { password: hash } },
            async (err) => {
              if (err) {
                return res.status(400).json({
                  message: err,
                });
              } else {
                await ResetPasswordMessage(email, password, req, res);
              }
            }
          );
        }
      });
    }
  });
};
