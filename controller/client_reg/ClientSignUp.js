const bcrypt = require("bcryptjs");

const { ClientSignUp } = require("../../model/ClientSignUp");
const { SendEmail } = require("../../util/SendEmail");
const {
  ClientSignUpValidation,
} = require("../../middleware/Validators/ClientValidation/ClientSignUpValidation");

exports.ClientPostSignUp = async (req, res) => {
  //destructure the req body
  const { firstName, lastName, email, password } = req.body;
  let registeredIpAddress = req.connection.remoteAddress.split(":")[3];

  //checking for error
  const { error } = ClientSignUpValidation.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //checking if email exist
  const emailExist = await ClientSignUp.findOne({ email: email });

  if (emailExist) {
    return res
      .status(401)
      .json({ message: "user already exist", status: "error" });
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
          return res.status(401).json({
            message: "user validation failed",
            status: "error",
          });
        } else {
          const client = new ClientSignUp({
            //creating an instance of Client data
            email,
            firstName,
            lastName,
            registeredIpAddress,
            password: hash,
          });

          try {
            //saving the new member to mongodb
            await client.save();
            await SendEmail(email, password, req);
            return res.status(200).json({
              massage: "signup successful",
              data: client,
              userId: client._id,
              status: "success",
            });
          } catch (error) {
            res.status(400).json({
              message: error,
              status: "error",
            });
          }
        }
      });
    }
  });
};
