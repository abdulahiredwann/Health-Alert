import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Footer Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-12">
          {/* About Us */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-gray-300">
              Health Alert is dedicated to improving healthcare management
              through innovative technology. Our mission is to make healthcare
              accessible and convenient for everyone.
            </p>
          </div>

          {/* Site Map */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">Site Map</h2>
            <ul>
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-2">
              <FaMapMarkerAlt className="inline-block mr-2" />
              Hawassa, Ethiopia
            </p>
            <p className="text-gray-300 mb-2">
              <FaEnvelope className="inline-block mr-2" />
              <a
                href="mailto:contact@healthalert.com"
                className="hover:text-blue-400 transition duration-300"
              >
                abdulahiredwann@gmail.com
              </a>
            </p>
            <p className="text-gray-300">
              <FaPhone className="inline-block mr-2" />
              +251 901 831 446
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:w-1/4">
            <h2 className="text-xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news and offers. Subscribe to our
              newsletter and never miss an update.
            </p>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Your Email Address"
                className="p-3 rounded-lg mb-4 border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Section */}
      </div>
    </footer>
  );
};

export default Footer;
