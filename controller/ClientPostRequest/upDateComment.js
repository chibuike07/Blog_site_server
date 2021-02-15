const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");
const {
  UpdateCommentValidation,
} = require("../../middleware/Validators/ClientPostValidation/UpdateCommentValidation");

module.exports.updateComment = async (req, res) => {
  //destructuring the req.body value;
  const { message } = req.body;
  const { role, _id } = req.client;

  const checkRole = ClientSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
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

  //updating comment
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
