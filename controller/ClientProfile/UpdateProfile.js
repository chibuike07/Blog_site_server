const { ClientSignUp } = require("../../model/ClientSignUp");

module.exports.UpdateProfile = async (req, res) => {
  //destructuring updated data
  const {
    firstName,
    lastName,
    email,
    contact,
    profileImage,
    ClientLoggedInIpAddress,
    phone,
    posts,
  } = req.body;

  //assigning the updated data to wrapper
  let wrapper = {
    firstName,
    lastName,
    email,
    contact,
    profileImage,
    ClientLoggedInIpAddress,
    phone,
    posts,
  };

  const checkRole = ClientSignUp.find({
    account_type: req.client.role,
    active: true,
  });

  if (!checkRole) {
    return res.status(403).jsoN({
      message:
        "access denied. seems you have been deactived from performing any actions or you don't have the rights!  Please contact the admin",
      status: "error",
    });
  }

  //updating the client profile data;
  const updatePersonalData = await ClientSignUp.findOneAndUpdate(
    { _id: req.client._id, active: true },

    //updating all the specified data
    {
      $set: wrapper,
    },

    //ignoring undefined data and adding the property that had not existed
    { omitUndefined: true, upsert: true, new: true },

    (err, updated) => {
      if (err) {
        //sending error if error
        return res.status(400).json({
          message: `the error was because ${err}`,
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "profile updated successfully",
          status: "success",
        });
      }
    }
  );
};
