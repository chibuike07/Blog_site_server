const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");
module.exports.getOnePost = async (req, res) => {
  //get  from params
  const { id } = req.params;

  const Clientstatus = ClientSignUp.find({
    _id: req.client.id,
    active: { $ne: false },
  });

  if (!Clientstatus) {
    return res.status(403).json({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }
  //check for event that match the client query
  const findClientPost = await ClientPostRequest.findById({
    _id: id,
  });

  //check for error
  if (!findClientPost) {
    return res.status(400).json({
      message: "No match was found",
      status: "error",
    });
  }

  //   send data to the client
  return res.status(200).json({
    data: findClientPost,
    status: "success",
  });
};
