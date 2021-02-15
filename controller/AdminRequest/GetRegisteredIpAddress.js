const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.getRegisteredIpAddress = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  // const { role } = req.client;

  // const checkRole = AdminSignUp.find({ account_type: role });

  // if (!checkRole) {
  //   return res.status(403).jsoN({
  //     message: "access denied",
  //     status: "error",
  //   });
  // }

  // getting all the booked event
  const registeredIpAddress = await ClientSignUp.find(
    {
      registeredIpAddress: { $exists: true, $ne: "" },
    },
    [
      "firstName",
      "lastName",
      "phone",
      "email",
      "contact",
      "profileImage",
      "posts",
      "_id",
      "createdAt",
      "registeredIpAddress",
    ]
  )
    .limit(limit * 1)
    .skip((page - 1) * limit);

  //check for error
  if (!registeredIpAddress) {
    return res.status(401).json({
      message: "No registered IpAddress at the moment",
      status: "error",
    });
  }

  //send the found data to the client
  return res.status(200).json({
    data: registeredIpAddress,
    status: "success",
  });
};
