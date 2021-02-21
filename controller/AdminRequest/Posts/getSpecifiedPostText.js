const { ClientPostRequest } = require("../../../model/ClientPosts");
const { AdminSignUp } = require("../../../model/AdminSignUp");
const { ClientSignUp } = require("../../../model/ClientSignUp");

module.exports.getOnePost = async (req, res) => {
  //get  from params
  const { postId } = req.params;

  const { id, role } = req.admin;

  const checkRole = await AdminSignUp.find({ _id: id, account_type: role });

  if (!checkRole) {
    return res.status(403).json({
      message: "access denied",
      status: "error",
    });
  }

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

  const latestComment = result.sort(
    (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
  );

  //   send data to the client
  return res.status(200).json({
    data: findClientPost,
    posterName: latestComment,
    status: "success",
  });
};
