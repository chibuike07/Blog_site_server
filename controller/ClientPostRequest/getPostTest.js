const { ClientPostRequest } = require("../../model/ClientPosts");

module.exports.getPost = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const ClientPost = await ClientPostRequest.find({}, [
    "title",
    "body",
    "comment",
    "createdAt",
    "updatedAt",
    "status",
  ])
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
      message: "Empty data was seen",
      status: "success",
    });
  }

  let sortFromLatest = ClientPost.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return res.status(200).json({ data: sortFromLatest, status: "success" });
};
