const jwt = require("jsonwebtoken");

module.exports.ClientVerifyAuth = async (req, res, next) => {
  //get the token secret from the .env file
  const { USER_TOKEN_SECRETE, USER_TOKEN_KEY } = process.env;

  const token = req.cookies[USER_TOKEN_KEY] || "";
  // console.log("verified", token);
  try {
    if (!token) {
      return res.status(401).send({
        message: "access denied",
        status: "error",
      });
    }

    const verified = jwt.verify(token, USER_TOKEN_SECRETE);

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
