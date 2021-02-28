const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

const ClientGenerateToken = (res, id, role) => {
  const expiration = process.env.DB_ENV === "testing" ? 100 : 604800000;
  const token = jwt.sign({ id, role }, process.env.USER_TOKEN_SECRETE, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });
  return res
    .cookie(process.env.USER_TOKEN_KEY, token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true,
    })
    .json({
      message: "login successful",
      status: "success",
    });
};
module.exports = ClientGenerateToken;
