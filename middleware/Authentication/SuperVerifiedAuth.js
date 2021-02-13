const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.SuperVerifiedAuth = async (req, res, next) => {
  //get the token secret from the .env file
  const { SUPER_TOKEN_SECRETE, SUPER_TOKEN_KEY } = process.env;

  const token = req.cookies[SUPER_TOKEN_KEY] || "";
  console.log("token", token);
  if (!token) {
    return res.status(401).send({
      message: "access denied",
      status: "error",
    });
  }

  try {
    const verified = jwt.verify(token, SUPER_TOKEN_SECRETE);
    //getting the userId and the token duration;
    req.vendor = verified;

    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid token",
      status: "error",
    });
  }
};
