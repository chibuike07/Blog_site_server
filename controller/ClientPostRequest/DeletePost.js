const { ClientPostRequest } = require("../../model/ClientPosts");

module.exports.deletePostByClient = async (req, res) => {
  const { postId } = req.params;
  const { _id } = req.client;

  const ClientPost = await ClientPostRequest.findByIdAndDelete(
    { _id: postId, clientId: _id },
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "No post exist with the ID you specified",
          status: "error",
        });
      } else {
        return res
          .status(200)
          .json({
            message: "Deleting of post was successful",
            status: "success",
          });
      }
    }
  );
};
