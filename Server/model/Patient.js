const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

// Define the Medication schema
const medicationSchema = new Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: {
      type: String,
      enum: [
        "Once Daily",
        "Twice Daily",
        "Three Times Daily",
        "Four Times Daily",
        "Other",
      ],
      required: true,
    },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    notes: { type: String, required: false },
  },
  { _id: false }
); // _id: false ensures no additional _id field is added to each medication

const patientSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  medications: [medicationSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
patientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      patient: true,
    },
    process.env.jwtPrivateKey
  );
  return token;
};
const Patient = mongoose.model("Patient", patientSchema);

function validatePatient(patient) {
  const medicationSchema = Joi.object({
    name: Joi.string().required(),
    dosage: Joi.string().required(),
    frequency: Joi.string()
      .valid(
        "Once Daily",
        "Twice Daily",
        "Three Times Daily",
        "Four Times Daily",
        "Other"
      )
      .required(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    notes: Joi.string().optional(),
  });

  const patientSchema = Joi.object({
    username: Joi.string().required().min(4).max(20),
    password: Joi.string().required().min(6).max(20),
    fullName: Joi.string().required().min(4).max(20),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    medications: Joi.array().items(medicationSchema).optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
  });

  return patientSchema.validate(patient);
}

function validateMedications(medications) {
  const medicationSchema = Joi.object({
    name: Joi.string().required(),
    dosage: Joi.string().required(),
    frequency: Joi.string()
      .valid(
        "Once Daily",
        "Twice Daily",
        "Three Times Daily",
        "Four Times Daily",
        "Other"
      )
      .required(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    notes: Joi.string().optional(),
  });

  // Define the schema to validate an array of medications
  const medicationsSchema = Joi.array().items(medicationSchema).optional();

  return medicationsSchema.validate(medications);
}

function validateLogin(patient) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(patient);
}

function validateForget(patient) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(patient);
}

function validateProfile(patient) {
  const schema = Joi.object({
    fullName: Joi.string().required().min(4).max(20),
    email: Joi.string().email().required(),
  });
  return schema.validate(patient);
}

module.exports = {
  Patient,
  validatePatient,
  validateMedications,
  validateLogin,
  validateForget,
  validateProfile,
};
