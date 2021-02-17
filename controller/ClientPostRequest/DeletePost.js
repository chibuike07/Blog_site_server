const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");
module.exports.deletePostByClient = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.client;

  const checkRole = await ClientSignUp.find({
    _id: id,
    active: { $ne: false },
  });

  if (!checkRole.length) {
    return res.status(403).json({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }

  const ClientPost = await ClientPostRequest.findByIdAndDelete(
    { _id: postId, clientId: id },
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "No post exist with the ID you specified",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "post deleted successfully",
          status: "success",
        });
      }
    }
  );
};
