const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { Patient } = require("./model/Patient");
const fs = require("fs"); // Import the fs module
const winston = require("winston");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define the cron job schedule based on the server's time zone
cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.log("Current server time:", now.toISOString());

  try {
    // Convert the current time to UTC for comparison
    const nowUTC = new Date(now.toISOString());

    const patients = await Patient.find({
      "medications.start_date": { $lte: nowUTC },
      "medications.end_date": { $gte: nowUTC },
    });

    for (let patient of patients) {
      for (let medication of patient.medications) {
        if (shouldNotify(medication, nowUTC)) {
          await sendNotification(patient, medication);
        }
      }
    }
  } catch (err) {
    console.log("Error fetching patients:", err);
  }
});

// Function to determine if a notification should be sent
function shouldNotify(medication, now) {
  const notificationWindow = 30 * 60 * 1000; // 30 minutes in milliseconds
  const startDate = new Date(medication.start_date);
  const endDate = new Date(medication.end_date);
  const lastNotified = medication.lastNotified
    ? new Date(medication.lastNotified)
    : null;

  if (now < startDate || now > endDate) {
    return false;
  }

  const frequency = medication.frequency.toLowerCase();
  let shouldNotify = false;

  switch (frequency) {
    case "once daily":
      const startTime = new Date(startDate);
      startTime.setHours(0, 0, 0, 0);
      const endTime = new Date(startDate);
      endTime.setHours(23, 59, 59, 999);

      if (now >= startTime && now <= endTime) {
        // Check if notification was sent recently
        if (lastNotified && now - lastNotified < notificationWindow) {
          return false;
        }
        shouldNotify = true;
      }
      break;

    case "twice daily":
      const morningTime = new Date(startDate);
      morningTime.setHours(9, 0, 0);
      const eveningTime = new Date(startDate);
      eveningTime.setHours(18, 0, 0);

      if (
        (Math.abs(now - morningTime) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - eveningTime) <= notificationWindow &&
          (!lastNotified || lastNotified.toDateString() !== now.toDateString()))
      ) {
        // Check if notification was sent recently
        if (lastNotified && now - lastNotified < notificationWindow) {
          return false;
        }
        shouldNotify = true;
      }
      break;

    case "three times daily":
      const morningTime3 = new Date(startDate);
      morningTime3.setHours(8, 0, 0);
      const noonTime = new Date(startDate);
      noonTime.setHours(12, 0, 0);
      const eveningTime3 = new Date(startDate);
      eveningTime3.setHours(18, 0, 0);

      if (
        (Math.abs(now - morningTime3) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - noonTime) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - eveningTime3) <= notificationWindow &&
          (!lastNotified || lastNotified.toDateString() !== now.toDateString()))
      ) {
        // Check if notification was sent recently
        if (lastNotified && now - lastNotified < notificationWindow) {
          return false;
        }
        shouldNotify = true;
      }
      break;

    case "four times daily":
      const earlyMorning = new Date(startDate);
      earlyMorning.setHours(6, 0, 0);
      const midMorning = new Date(startDate);
      midMorning.setHours(9, 0, 0);
      const afternoon = new Date(startDate);
      afternoon.setHours(15, 0, 0);
      const eveningTime4 = new Date(startDate);
      eveningTime4.setHours(18, 0, 0);

      if (
        (Math.abs(now - earlyMorning) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - midMorning) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - afternoon) <= notificationWindow &&
          (!lastNotified ||
            lastNotified.toDateString() !== now.toDateString())) ||
        (Math.abs(now - eveningTime4) <= notificationWindow &&
          (!lastNotified || lastNotified.toDateString() !== now.toDateString()))
      ) {
        // Check if notification was sent recently
        if (lastNotified && now - lastNotified < notificationWindow) {
          return false;
        }
        shouldNotify = true;
      }
      break;

    default:
      console.log(`Unknown frequency: ${frequency}`);
  }

  return shouldNotify;
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "notificationLogs.log" }),
    new winston.transports.Console(),
  ],
});

function saveLog(logData) {
  logger.info(logData);
}

async function sendNotification(patient, medication) {
  const logData = {
    timestamp: new Date().toISOString(),
    patientName: patient.fullName,
    medicationName: medication.name,
    patientEmail: patient.email,
    medicationId: medication._id,
  };

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: patient.email,
      subject: "Medication Reminder",
      text: `Dear ${patient.fullName},\n\nIt's time to take your medication: ${medication.name}. Note: ${medication.notes} Please follow the prescribed schedule.\n\nBest regards,\nHealthAlert \n\nDeveloper: @Abdulahi Redwan`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${patient.email}`);

    // Log data
    saveLog(logData);

    if (!medication._id) {
      console.error("Medication _id is missing.");
      return;
    }

    const result = await Patient.findOneAndUpdate(
      { _id: patient._id, "medications._id": medication._id },
      { $set: { "medications.$.lastNotified": new Date() } },
      { new: true }
    );

    if (!result) {
      console.log("No document found to update.");
    } else {
      console.log("Successfully updated lastNotified field.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
console.log("Server time zone offset:", new Date().getTimezoneOffset());
