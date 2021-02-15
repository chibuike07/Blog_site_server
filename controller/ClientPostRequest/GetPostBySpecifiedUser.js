const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getPostBySpecifiedUser = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { _id, role } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  const ClientPost = await ClientPostRequest.find({ clientId: _id }, [
    "title",
    "body",
    "comment",
    "createdAt",
    "updatedAt",
  ])
    .limit(limit * 1)
    .skip((page - 1) * limit);

  if (!ClientPost) {
    return res.status(400).json({
      message: "No event has been created",
      status: "error",
    });
  }

  if (ClientPost.length < 1) {
    return res.status(200).json({
      message: "you have reached the page limit",
      status: "success",
    });
  }

  return res.status(200).json({ data: ClientPost, status: "success" });
};
