const { ClientPostRequest } = require("../../model/ClientPosts");

module.exports.getPostBySpecifiedUser = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { _id } = req.client;
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
