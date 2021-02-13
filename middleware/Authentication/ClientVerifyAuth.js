const jwt = require("jsonwebtoken");

module.exports.ClientVerifyAuth = async (req, res, next) => {
  //get the token secret from the .env file
  const { CLIENT_TOKEN_SECRETE, CLIENT_TOKEN_KEY } = process.env;

  const token = req.cookies[CLIENT_TOKEN_KEY] || "";

  try {
    if (!token) {
      return res.status(401).send({
        message: "access denied",
        status: "error",
      });
    }

    const verified = jwt.verify(token, CLIENT_TOKEN_SECRETE);

    //getting the userId and the token duration;
    req.client = verified;

    next();
  } catch (error) {
    res.status(501).send({
      message: "invalid token " + error,
      status: "error",
    });
  }
};
