const { ClientSignUp } = require("../../model/ClientSignUp");
const { AdminSignUp } = require("../../model/AdminSignUp");

module.exports.getAllClients = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { role } = req.admin;

  const checkRole = AdminSignUp.find({ account_type: role });

  if (!checkRole) {
    return res.status(403).jsoN({
      message: "access denied",
      status: "error",
    });
  }

  // getting all the booked event
  const Clients = await ClientSignUp.find({}, [
    "firstName",
    "lastName",
    "phone",
    "email",
    "contact",
    "profileImage",
    "active",
    "posts",
    "_id",
    "createdAt",
  ])
    .limit(limit * 1)
    .skip((page - 1) * limit);

  //check for error
  if (!Clients) {
    return res.status(401).json({
      message: "No registered user yet",
      status: "error",
    });
  }

  if (Clients.length < 1) {
    return res.status(204).json({
      infor: "No user Yet!!!",
      status: "success",
    });
  }

  //send the found data to the client
  return res.status(200).json({
    data: Clients,
    status: "success",
  });
};
