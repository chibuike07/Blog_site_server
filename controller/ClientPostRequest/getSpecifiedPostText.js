const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.getOnePost = async (req, res) => {
  //get  from params
  const { postId } = req.params;

  //check for event that match the client query
  const findClientPost = await ClientPostRequest.findById({
    _id: postId,
  });

  //check for error
  if (!findClientPost) {
    return res.status(400).json({
      message: "No match was found",
      status: "error",
    });
  }

  const getNamesIdThatCommented = findClientPost.comment.map(
    ({ clientId }) => clientId
  );

  const result = await ClientSignUp.find(
    {
      _id: getNamesIdThatCommented,
    },
    ["firstName", "lastName", "profileImage"]
  );

  // console.log("result", result);
  //   send data to the client
  return res.status(200).json({
    data: findClientPost,
    posterName: result,
    status: "success",
  });
};
