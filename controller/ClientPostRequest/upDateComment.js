const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");
const {
  UpdateCommentValidation,
} = require("../../middleware/Validators/ClientPostValidation/UpdateCommentValidation");

module.exports.updateComment = async (req, res) => {
  //destructuring the req.body value;
  const { message } = req.body;
  const { role, _id } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role, active: true });

  if (!checkRole) {
    return res.status(403).json({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }

  //getting the sent id
  const { post_id } = req.params;

  //checking for errors
  const { error } = UpdateCommentValidation.validate(req.body);

  if (error) {
    //sending error message
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }
  const clientHaveUpdatedBefore = await ClientPostRequest.findOne(
    {
      _id: post_id,
      comment: { $exists: true },
    },
    ["comment"]
  );

  let mapComment;
  if (clientHaveUpdatedBefore.comment.length > 0) {
    mapComment = clientHaveUpdatedBefore.comment.filter((value) => {
      return value.clientId === _id;
    });
    if (mapComment.length) {
      return res.status(401).json({
        message: "you have already commented on this post!",
      });
    }
  }

  await ClientPostRequest.updateOne(
    { _id: post_id },
    {
      $addToSet: {
        comment: {
          message: message,
          clientId: _id,
        },
      },
    },

    (err) => {
      if (err) {
        return res.status(400).json({
          message: "Your Update was not sucessful please try again" + error,

          status: "error",
        });
      }

      return res.status(200).json({
        message: "Your comment was sent successfully",
        status: "success",
      });
    }
  );
};
