const { ClientPostRequest } = require("../../../model/ClientPosts");
const { AdminSignUp } = require("../../../model/AdminSignUp");

module.exports.getPostByAdmin = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const { role } = req.admin;

  const checkRole = await AdminSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).json({
      message: "access denied",
      status: "error",
    });
  }

  const ClientPost = await ClientPostRequest.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);

  if (!ClientPost) {
    return res.status(400).json({
      message: "No post has been created",
      status: "error",
    });
  }

  if (ClientPost.length < 1) {
    return res.status(204).json({
      message: "data is empty",
      status: "success",
    });
  }

  return res.status(200).json({ data: ClientPost, status: "success" });
};
