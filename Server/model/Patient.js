const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
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

module.exports = {
  Patient,
  validatePatient,
  validateMedications,
};
