import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide text-white">
          About Us
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Learn more about our mission, vision, and how you can get involved.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto grid gap-8">
        {[
          {
            title: "Our Mission",
            icon: <FaBullseye className="text-blue-500 text-5xl mb-4" />,
            content:
              "Our mission is to foster a stronger, more connected mosque community by providing a platform where volunteers can engage in meaningful work that supports our shared values of compassion, service, and unity."
          },
          {
            title: "What We Do",
            icon: <FaHandsHelping className="text-yellow-400 text-5xl mb-4" />,
            content:
              "Our platform helps volunteers connect with mosque tasks and events. From setting up Friday prayer arrangements to organizing special events, our app makes it easy to find opportunities that suit your schedule and interests."
          },
          {
            title: "Why Volunteer?",
            icon: <FaHeart className="text-red-500 text-5xl mb-4" />,
            content:
              "Volunteering at the mosque brings people together. Each task completed helps the mosque run smoothly and brings us closer as a community. Every act of service counts."
          },
          {
            title: "Our Community",
            icon: <FaUsers className="text-green-400 text-5xl mb-4" />,
            content:
              "We welcome everyone to join and make a difference, whether you're a regular attendee or new to the community. Together, we can create a welcoming environment and help each other thrive."
          }
        ].map((section, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 shadow-xl p-8 rounded-xl transition-all hover:scale-105 hover:shadow-2xl"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center">
              {section.icon}
              <h2 className="text-2xl font-bold text-white mb-2">
                {section.title}
              </h2>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mt-2">
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <p className="text-xl text-blue-500 font-semibold">
          Join us in making a difference in our community!
        </p>
        <button
          className="mt-5 px-8 py-2 rounded-full text-lg bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition-all duration-200"
          onClick={() => (window.location.href = "/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
