import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white h-72 md:h-96 flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          Get in Touch with Us
        </h1>
        <p className="text-base md:text-lg">
          We're here to help you with any questions or concerns.
        </p>
      </section>

      {/* Contact Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Contact Form
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-base md:text-lg font-semibold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-base md:text-lg font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-base md:text-lg font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Contact Information
            </h2>
            <p className="text-base md:text-lg mb-4">
              Feel free to reach out to us through the following contact
              details:
            </p>
            <div className="mb-4">
              <p className="text-base md:text-lg font-semibold mb-2">
                Address:
              </p>
              <p className="text-gray-700">Hawassa Ethiopia</p>
            </div>
            <div className="mb-4">
              <p className="text-base md:text-lg font-semibold mb-2">Email:</p>
              <p className="text-gray-700">abdulahiredwann@gmail.com</p>
            </div>
            <div className="mb-4">
              <p className="text-base md:text-lg font-semibold mb-2">Phone:</p>
              <p className="text-gray-700">+251901831446</p>
            </div>
            <div className="mt-6">
              <p className="text-base md:text-lg font-semibold mb-2">
                Find Us Here:
              </p>
              <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/d/embed?mid=1pRALCi2BQHoRc7DdvuieFFFVB20jKCQ&ehbc=2E312F"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Connect?
        </h2>
        <p className="text-base md:text-lg mb-6">
          Whether you have questions, feedback, or just want to say hello, we're
          here to listen.
        </p>
        <a
          href="mailto:contact@healthalert.com"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Send Us an Email
        </a>
      </section>
    </div>
  );
};

export default ContactPage;
