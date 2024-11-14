import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa"; // Import refined icons
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AboutPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6
      }
    })
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide  text-white">
          About Us
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Welcome to Our Mosque Volunteer Platform!
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto text-center space-y-8">
        {[
          {
            title: "Our Mission",
            icon: <FaBullseye className="text-primary text-5xl mb-4" />,
            content:
              "Our mission is to foster a stronger, more connected mosque community by providing a platform where volunteers can engage in meaningful work that supports our shared values of compassion, service, and unity. This app streamlines volunteer opportunities, making it easy for community members to give back, gain rewarding experiences, and earn points for their contributions."
          },
          {
            title: "What We Do",
            icon: <FaHandsHelping className="text-primary text-5xl mb-4" />,
            content:
              "Our platform helps volunteers connect with mosque tasks and events. From setting up Friday prayer arrangements to organizing special events, our app makes it easy to find opportunities that suit your schedule and interests."
          },
          {
            title: "Why Volunteer?",
            icon: <FaHeart className="text-primary text-5xl mb-4" />,
            content:
              "Volunteering at the mosque brings people together. Each task completed helps the mosque run smoothly and brings us closer as a community. Whether it's helping with event setup, managing parking, or assisting in community outreach, every act of service counts."
          },
          {
            title: "Our Community",
            icon: <FaUsers className="text-primary text-5xl mb-4" />,
            content:
              "We welcome everyone to join and make a difference, whether you're a regular attendee or new to the community. Together, we can create a welcoming environment and help each other thrive."
          }
        ].map((section, index) => (
          <motion.div
            key={index}
            className="bg-base-300 shadow-xl p-8 rounded-xl transform transition-all hover:scale-105 hover:shadow-2xl"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center">
              {section.icon}
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
                {section.title}
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-2">
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <p className="text-xl text-primary font-semibold">
          Join us in making a difference in our community!
        </p>
        <button
          className="mt-5 btn bg-blue-500 px-8 py-2 rounded-full text-lg hover:shadow-lg transition-all duration-200 text-black hover:text-white"
          onClick={() => (window.location.href = "/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
