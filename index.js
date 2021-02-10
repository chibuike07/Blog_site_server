const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { ClientSignupRouter } = require("./routes/ClientRegs/ClientSignUp");
const { AdminRegRouter } = require("./routes/AdminRegs/AdminRegs");
const { ClientLoginRouter } = require("./routes/ClientRegs/ClientLoginRoute");
const { AdminLoginRouter } = require("./routes/AdminRegs/AdminLogin");
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

const { ORIGINPATH, MONGODB_lOCAL_URI } = process.env;

//getting the mongodb uri from the env file
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_lOCAL_URI;

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: ORIGINPATH,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", ClientSignupRouter);
app.use("/api/v1/", AdminRegRouter);
app.use("/api/v1/", ClientLoginRouter);
app.use("/api/v1/", AdminLoginRouter);

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
