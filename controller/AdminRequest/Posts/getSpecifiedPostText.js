const { ClientPostRequest } = require("../../model/ClientPosts");

module.exports.getOnePost = async (req, res) => {
  //get  from params
  const { id } = req.params;

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
