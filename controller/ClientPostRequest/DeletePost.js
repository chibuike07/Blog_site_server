const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");
module.exports.deletePostByClient = async (req, res) => {
  const { postId } = req.params;
  const { _id, role } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  const ClientPost = await ClientPostRequest.findByIdAndDelete(
    { _id: postId, clientId: _id },
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "No post exist with the ID you specified",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "Deleting of post was successful",
          status: "success",
        });
      }
    }
  );
};
