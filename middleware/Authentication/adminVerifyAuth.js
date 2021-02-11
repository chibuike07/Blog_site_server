const jwt = require("jsonwebtoken");

module.exports.adminVerification = async (req, res, next) => {
  //get the token secret from the .env file
  const { ADMIN_TOKEN_SECRETE, ADMIN_TOKEN_KEY } = process.env;

  const token = req.cookies[ADMIN_TOKEN_KEY] || "";

  try {
    if (!token) {
      return res.status(401).send({
        message: "access denied",
        status: "error",
      });
    }

    const verified = jwt.verify(token, ADMIN_TOKEN_SECRETE);

    //getting the userId and the token duration;
    req.user = verified;
    next();
  } catch (error) {
    res.status(501).send({
      message: "invalid token",
      status: "error",
    });
  }
};
