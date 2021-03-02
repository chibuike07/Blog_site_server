const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { ClientSignupRouter } = require("./routes/ClientRegs/ClientSignUp");
const { AdminRegRouter } = require("./routes/AdminRegs/AdminRegs");
const { ClientLoginRouter } = require("./routes/ClientRegs/ClientLoginRoute");
const { AdminLoginRouter } = require("./routes/AdminRegs/AdminLogin");
const { ClientPostRouter } = require("./routes/ClientPosts/PostText");
const { ClientGetPostRouter } = require("./routes/ClientPosts/GetPost");
const {
  ClientGetSpecifiedPostRouter,
} = require("./routes/ClientPosts/GetSpecifiedPost");
const {
  ClientUpdateSpecifiedPostRouter,
} = require("./routes/ClientPosts/UpdatePost");
const {
  ClientUpdateSpecifiedPostCommentRouter,
} = require("./routes/ClientPosts/UpdateComments");
const {
  ClientGetPostBySpecifiedUserRouter,
} = require("./routes/ClientPosts/GetPostBySpecifiedUser");
const GetUserProfileRouter = require("./routes/UserProfile/GetProfile");
const UpdateUserProfileRouter = require("./routes/UserProfile/UpdateUserProfile");
const UploadProfileImageRouter = require("./routes/UserProfile/UpdateProfilePhotos");
const { ClientDeletePostRouter } = require("./routes/ClientPosts/DeletePost");
const {
  ClientLoggerStatusRouter,
} = require("./routes/ClientPosts/upDateLoggerStatus");
const {
  GetAllClientByAdminRouter,
} = require("./routes/AdminRequest/GetClients");
const {
  GetRegisteredIpAddressByAdminRouter,
} = require("./routes/AdminRequest/GetRegisteredIpAddress");
const {
  GetLastestLoggedInClientByAdminRouter,
} = require("./routes/AdminRequest/GetLastestLoggerData");
const {
  ClientForgetPasswordRouter,
} = require("./routes/ClientRegs/ForgotPassword");

const {
  ClientResetPasswordRouter,
} = require("./routes/ClientRegs/ResetPassword");
const {
  GetOneClientByAdminRouter,
} = require("./routes/AdminRequest/GetSpecifiedClientByAdmin");

const {
  DeleteSpecifiedClientByAdminRouter,
} = require("./routes/AdminRequest/DeleteClientByAdmin");
const {
  GetOneClientPostByAdminRouter,
} = require("./routes/AdminRequest/GetSpecifiedPost");
const {
  UpdateOneClientStatusByAdminRouter,
} = require("./routes/AdminRequest/updateClientStatus");
const {
  UpdateOneClientProfileByAdminRouter,
} = require("./routes/AdminRequest/upDateClientProfileByAdmin");
const {
  GetClientPostByAdminRouter,
} = require("./routes/AdminRequest/GetPostByAdmin");

require("dotenv").config();

//setting the mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

//setting the port to use
const PORT = process.env.PORT || 4000;

const { DEPLOYEDPATH, ORIGINPATH, MONGODB_lOCAL_URI } = process.env;

//getting the mongodb uri from the env file
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_lOCAL_URI;
const app = express();

app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, DEPLOYEDPATH, ORIGINPATH],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/", ClientSignupRouter);
app.use("/api/v1/", AdminRegRouter);
app.use("/api/v1/", ClientLoginRouter);
app.use("/api/v1/", AdminLoginRouter);
app.use("/api/v1/", ClientPostRouter);
app.use("/api/v1/", ClientGetPostRouter);
app.use("/api/v1/", ClientGetSpecifiedPostRouter);
app.use("/api/v1/", ClientUpdateSpecifiedPostRouter);
app.use("/api/v1/", ClientUpdateSpecifiedPostCommentRouter);
app.use("/api/v1/", ClientGetPostBySpecifiedUserRouter);
app.use("/api/v1/", GetUserProfileRouter);
app.use("/api/v1/", UpdateUserProfileRouter);
app.use("/api/v1/", UploadProfileImageRouter);
app.use("/api/v1/", ClientDeletePostRouter);
app.use("/api/v1/", ClientLoggerStatusRouter);
app.use("/api/v1/", GetAllClientByAdminRouter);
app.use("/api/v1/", GetRegisteredIpAddressByAdminRouter);
app.use("/api/v1/", GetLastestLoggedInClientByAdminRouter);
app.use("/api/v1/", ClientForgetPasswordRouter);
app.use("/api/v1/", ClientResetPasswordRouter);
app.use("/api/v1/", GetOneClientByAdminRouter);
app.use("/api/v1/", DeleteSpecifiedClientByAdminRouter);
app.use("/api/v1/", GetOneClientPostByAdminRouter);
app.use("/api/v1/", UpdateOneClientStatusByAdminRouter);
app.use("/api/v1/", UpdateOneClientProfileByAdminRouter);
app.use("/api/v1/", GetClientPostByAdminRouter);

//connecting to the database
mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    console.warn("conneted successfully");
  })
  .catch((err) => {
    throw "error occured : " + err;
  });

//start the server
app.listen(PORT, () => {
  console.log(`server ready on ${PORT}`);
});
