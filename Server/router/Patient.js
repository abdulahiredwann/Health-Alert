const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  validatePatient,
  Patient,
  validateMedications,
} = require("../model/Patient");

// Create Patient Register
router.post("/", async (req, res) => {
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

    let newPatient = new Patient({
      username,
      password,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
    });

    await newPatient.save();
    res.status(201).send(newPatient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.put("/:username/medicine", async (req, res) => {
  try {
    const { username } = req.params;
    const { medications } = req.body;

    // Find the patient by username
    let patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).send("Username not found!");
    }

    // Validate the medications array
    const { error } = validateMedications(medications);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update medications
    patient.medications = medications;

    // Save the updated patient
    await patient.save();

    // Send success response
    return res.status(200).json({ patient });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
