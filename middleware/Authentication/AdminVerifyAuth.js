const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const verifyToken = async (req, res, next) => {
  const token = req.cookies[process.env.SUPPER_TOKEN_KEY] || "";

  //   console.log("req.headers.authorization", req.headers);
  try {
    if (!token) {
      return res.status(401).json({ message: "You need to Login" });
    }
    const decrypt = await jwt.verify(token, process.env.SUPPER_TOKEN_SECRETE);
    req.admin = {
      id: decrypt.id,
      role: decrypt.role,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
