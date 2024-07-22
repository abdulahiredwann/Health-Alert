const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Validate, Doctor } = require("../model/Doctor");
const { validateLogin, validateForget } = require("../model/Patient");
const bcrypt = require("bcrypt");
const { auth, admin } = require("../Middleware/AuthAdmin");

// Create Doctor
router.post("/", [auth, admin], async (req, res) => {
  try {
    const { username, password, fullName, email, phone, speciality } = req.body;
    const { error } = Validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let doctor = await Doctor.findOne({ username });
    if (doctor) {
      return res.status(400).send("username Alerdy Registerd");
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let newDoctore = new Doctor({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      email: email,
      phone: password,
      speciality: speciality,
    });

    await newDoctore.save();
    res.status(201).send(newDoctore);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Login Doctors
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const doctor = await Doctor.findOne({ username });
    if (!doctor) {
      return res.status(400).send("Invalid Username or Password!");
    }
    const validatePassword = await bcrypt.compare(password, doctor.password);
    if (!validatePassword) {
      return res.status(400).send("Invalid Username or Passwor!");
    }
    const token = doctor.generateAuthToken();
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Forget doctor Password
router.post("/forget", [auth, admin], async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const { error } = validateForget(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const doctore = await Doctor.findOne({ username });
    if (!doctore) {
      return res.status(404).send("Username not Found!");
    }

    const hasheNewPassword = await bcrypt.hash(newPassword, 10);
    doctore.password = hasheNewPassword;

    await doctore.save();
    res.status(200).send("Done");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
