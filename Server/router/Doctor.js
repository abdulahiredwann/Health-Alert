const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Validate, Doctor } = require("../model/Doctor");

// Create Doctor
router.post("/", async (req, res) => {
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
    let newDoctore = new Doctor({
      username: username,
      password: password,
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

module.exports = router;
