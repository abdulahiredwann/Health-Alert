# HealthAlert

**HealthAlert** is a comprehensive hospital management system designed to streamline medication management and patient notifications. The system allows new patients to register and securely log in. Doctors can assign medications to patients, and the system automatically sends timely notifications to remind patients when it’s time to take their medication. This ensures adherence to prescribed treatments and improves overall patient care.

## Features

- **Patient Registration & Login**: New patients can register with a username and password. Existing patients can log in to access their medication schedule and notifications.
- **Medication Assignment**: Doctors can assign medication regimens to patients, specifying dosage, frequency, start date, and end date.
- **Automated Notifications**: The system sends timely notifications to patients via email or SMS, reminding them of medication schedules and providing relevant details.
- **Medication Management**: Manage and update medication details for patients with ease.
- **User-Friendly Interface**: A simple and intuitive interface for both patients and healthcare providers.

## Technologies Used

- **Frontend**: React.js with TypeScript for a dynamic and responsive user interface.
- **Backend**: Node.js and Express.js for server-side logic and API management.
- **Database**: SQL-based database for structured data storage and retrieval.
- **Email/SMS Notifications**: Integrated with `nodemailer` and `node-cron` for scheduling and sending notifications.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/abdulahiredwann/Health-Alert.git
   Navigate to the Project Directory:

bash
Copy code
cd healthalert
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables:

Create a .env file in the root directory and add your environment variables as required.

Run the Project:

bash
Copy code
npm start
Usage
Register: New patients can sign up by providing necessary details.
Login: Registered patients and doctors can log in to their accounts.
Assign Medication: Doctors can assign and manage medications.
Receive Notifications: Patients will receive reminders for their medication schedules.
Contributing
Contributions to HealthAlert are welcome! Please follow the contributing guidelines and ensure that your changes are well-tested.


