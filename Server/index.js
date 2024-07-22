require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const doctor = require("./router/Doctor");
const patient = require("./router/Patient");
const admin = require("./router/Admin");

const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/Healt_Alert")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("couldn't connect DB", err);
  });

app.use("/api/doctor", doctor);
app.use("/api/patient", patient);
app.use("/api/admin", admin);

app.listen(3000, () => {
  console.log("server listinign 3000");
});
