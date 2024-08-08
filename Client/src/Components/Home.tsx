import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Welcome to Health Alert
        </h1>

        <a
          href="#signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a7 7 0 100 14 7 7 0 000-14zm-1 10v-5h2v5h-2zm0 2v-1h2v1h-2z" />
              </svg>
              <h3 className="text-2xl font-semibold mb-4">
                Medication Reminders
              </h3>
              <p>
                Receive timely reminders to never miss a dose. Customize your
                medication schedule and get notifications straight to your
                device.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4h-2V2H7v2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zM8 4V3h2v1H8zm6 14H6V8h8v10z" />
              </svg>
              <h3 className="text-2xl font-semibold mb-4">Easy Management</h3>
              <p>
                Manage your medications effortlessly. Track prescriptions,
                dosages, and schedules all in one place with a user-friendly
                interface.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a7 7 0 100 14 7 7 0 000-14zm-1 10v-5h2v5h-2zm0 2v-1h2v1h-2z" />
              </svg>
              <h3 className="text-2xl font-semibold mb-4">Health Tracking</h3>
              <p>
                Track your health progress with insightful data and analytics.
                Our app provides detailed information to help you stay on top of
                your health goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-around items-start">
            <div className="md:w-1/3 p-6">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">
                  1. Register & Log In
                </h3>
                <p>
                  Sign up for an account and log in to your dashboard. Provide
                  necessary health information and medication details.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-6">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">
                  2. Doctor Assignment
                </h3>
                <p>
                  Your doctor will assign medications and set up schedules based
                  on your health needs. You’ll receive notifications for each
                  dose.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-6">
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">
                  3. Track & Follow Up
                </h3>
                <p>
                  Monitor your medication adherence and health progress. Keep
                  track of your medication history and follow up with your
                  doctor as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-start">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0 md:w-1/3 transition-transform transform hover:scale-105">
              <p className="italic mb-4">
                "Health Alert has transformed the way I manage my medications.
                The reminders are so helpful!"
              </p>
              <p className="font-semibold">— Sarah Johnson</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0 md:w-1/3 transition-transform transform hover:scale-105">
              <p className="italic mb-4">
                "I love how easy it is to track my health progress with this
                app. Highly recommended!"
              </p>
              <p className="font-semibold">— Michael Lee</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/3 transition-transform transform hover:scale-105">
              <p className="italic mb-4">
                "The user-friendly interface and reliable notifications make
                Health Alert a must-have for medication management."
              </p>
              <p className="font-semibold">— Emily Davis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="signup" className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-lg mb-8">
          Sign up now to start managing your medications and stay on top of your
          health with Health Alert.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Sign Up
        </a>
      </section>
    </div>
  );
};

export default HomePage;
