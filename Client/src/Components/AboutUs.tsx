import React from "react";
import founder from "../../public/founder.jpg";
import h from "../../public/he.jpeg";
import o from "../../public/o.jpg";
import f from "../../public/fu.jpg";

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-r from-blue-700 to-teal-600 text-white min-h-[50vh] flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          About Us
        </h1>
        <p className="text-base md:text-lg">
          Discover who we are, what we do, and why we do it.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-base md:text-lg mb-4">
                At Health Alert, our mission is to empower individuals to manage
                their health effectively through innovative technology. We are
                committed to providing reliable and user-friendly solutions for
                medication management and health tracking.
              </p>
              <p className="text-base md:text-lg">
                Our goal is to make healthcare more accessible and convenient,
                ensuring that everyone can lead a healthier and more balanced
                life.
              </p>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
              <img
                src={h}
                alt="Mission Image"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-8 md:py-16 bg-blue-50">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-[-10px]">
              <img
                src={f}
                alt="Team Member 1"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-blue-600 mb-4"
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Fuad Jemal
              </h3>
              <p className="text-base md:text-lg text-gray-700">
                Front-End Develope
              </p>
              <p className="mt-2 md:mt-4 text-sm md:text-base">
                a talented Front-End Developer with a keen eye for design and
                user experience. With a strong background in creating visually
                appealing and responsive web applications,
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-[-10px]">
              <img
                src={founder}
                alt="Team Member 2"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-blue-600 mb-4"
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Abdulahi Redwan
              </h3>
              <p className="text-base md:text-lg text-gray-700">
                Back-End Developer
              </p>
              <p className="mt-2 md:mt-4 text-sm md:text-base">
                a highly skilled Back-End Developer with extensive experience in
                building robust and scalable server-side applications. Armed
                with a degree in Software Engineering and a deep understanding
                of server-side technologies,
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
            Meet Our Founder
          </h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:translate-y-[-10px]">
              <img
                src={founder}
                alt="Founder"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-blue-600 mb-4"
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                Abdulahi Redwan
              </h3>
              <p className="text-base md:text-lg text-gray-700">
                Founder & CEO
              </p>
              <p className="mt-2 md:mt-4 text-sm md:text-base">
                Abdulahi Redwan is the visionary behind Health Alert, driven by
                a deep commitment to improving healthcare management. With a
                focus on addressing real-world challenges, Abdulahi has
                dedicated himself to creating a platform that enhances
                medication adherence and health tracking. His passion for
                technology and innovation fuels the development of solutions
                that empower individuals to take control of their health and
                lead better lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
            Our History
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <img
                src={o}
                alt="History Image"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <p className="text-base md:text-lg mb-4">
                Health Alert was born out of a personal commitment to addressing
                a critical gap in healthcare management. As a passionate
                developer, I recognized the growing need for a reliable solution
                to help individuals manage their medications effectively and
                stay on top of their health. In 2024, I embarked on a mission to
                create Health Alert—a platform designed to solve real problems
                faced by patients and caregivers. My goal was to build a system
                that not only provides timely medication reminders but also
                integrates health tracking to support users in their journey
                towards better health. Through dedication and innovation, Health
                Alert has evolved into a comprehensive tool that empowers users
                to take control of their healthcare, ensuring that no one misses
                a dose and everyone can monitor their health progress with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-8 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join Us on Our Mission
        </h2>
        <p className="text-base md:text-lg mb-6">
          Be part of our journey to improve healthcare for everyone. Connect
          with us to learn more about our initiatives and how you can get
          involved.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default AboutUsPage;
