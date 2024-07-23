const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  validatePatient,
  Patient,
  validateMedications,
  validateLogin,
  validateForget,
  validateProfile,
} = require("../model/Patient");
const { auth, admin } = require("../Middleware/AuthAdmin");
const { auth_Doctor, authorized_Doctor } = require("../Middleware/AuthDoctor");
const {
  auth_patient,
  authorized_Patient,
} = require("../Middleware/AuthPatient");

// Create Patient Register
router.post("/", [auth, admin], async (req, res) => {
  try {
    const { username, password, fullName, email, phone, dateOfBirth, gender } =
      req.body;
    const { error } = validatePatient(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let patient = await Patient.findOne({ username });
    if (patient) {
      return res.status(400).send("Username Alerdy Registerd!");
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    let newPatient = new Patient({
      username,
      password: hashedPassword,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
    });

    await newPatient.save();
    res.status(201).send(_.omit(newPatient.toObject(), ["password"]));
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Login Patient
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(400).send("Invalid Username or Password!");
    }
    const validatePassword = await bcrypt.compare(password, patient.password);
    if (!validatePassword) {
      return res.status(400).send("Invalid Username or Password");
    }
    const token = patient.generateAuthToken();
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
// Update Profile
router.put(
  "/:username/profile",
  [auth_patient, authorized_Patient],
  async (req, res) => {
    try {
      const { fullName, email } = req.body;
      const { username } = req.params;
      const { error } = validateProfile(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const patient = await Patient.findOne({ username });
      if (!patient) {
        return res.status(404).send("Username not Found!");
      }
      patient.fullName = fullName;
      patient.email = email;

      await patient.save();
      res.status(200).send("Done");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// Forget Password
router.post("/forget", [auth, admin], async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const { error } = validateForget(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).send("Username Not Found!");
    }

    const hasheNewPassword = await bcrypt.hash(newPassword, 10);
    patient.password = hasheNewPassword;
    await patient.save();
    res.status(201).send("Done!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Errir");
  }
});

// Give medicine for Patient
router.put(
  "/:username/medicine",
  [auth_Doctor, authorized_Doctor],
  async (req, res) => {
    try {
      const { username } = req.params;
      const { medication } = req.body;

      // Find the patient by username
      let patient = await Patient.findOne({ username });
      if (!patient) {
        return res.status(404).send("Username not found!");
      }

      // Validate the medication object
      const { error } = validateMedications([medication]); // Validate single medication
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      // Add new medication to the array
      patient.medications.push(medication);

      // Save the updated patient
      await patient.save();

      // Send success response
      return res.status(200).send(_.omit(patient.toObject(), ["password"]));
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        return res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
