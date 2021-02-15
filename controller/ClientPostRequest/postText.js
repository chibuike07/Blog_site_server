const {
  ClientPostValidation,
} = require("../../middleware/Validators/ClientPostValidation/PostValidation");
const { ClientPostRequest } = require("../../model/ClientPosts");
const { ClientSignUp } = require("../../model/ClientSignUp");

exports.addPost = async (req, res) => {
  //destructruturing of client data from req.body
  const { title, body } = req.body;

  //checking for errors
  const { error } = ClientPostValidation.validate(req.body);

  if (error) {
    //sending error message
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  const checkRole = ClientSignUp.find({ account_type: req.client.role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  //setting data into collection object
  const Posts = new ClientPostRequest({
    title,
    body,
    clientId: req.client._id,
  });

  //getting post count by a single client
  const ClientPostCount = await ClientPostRequest.find({
    clientId: req.client._id,
  }).countDocuments();

  //updating the count to the post document of the client
  const ClientData = await ClientSignUp.findOneAndUpdate(
    { _id: req.client._id },
    {
      $set: { posts: ClientPostCount + 1 },
    }
  );

  try {
    //saving data to  database
    await Posts.save();

    //sending a success message to the client
    return res.status(200).json({
      message: "Post Saved Successfully",
      status: "success",
      post: Posts,
    });
  } catch (err) {
    //sending an error message to the client
    return res.status(400).json({
      message: err,
      status: "error",
    });
  }
};
