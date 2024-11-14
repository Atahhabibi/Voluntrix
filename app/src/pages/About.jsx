
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../images/mosque-1.jpg";
import img2 from "../images/mosque-2.jpg";
import img3 from "../images/mosque-3.jpg";
import img4 from "../images/mosque-4.jpg";
import img5 from "../images/mosque-5.jpg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const mosqueImages = [img1, img2, img3, img4, img5];

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
        <h1 className="text-4xl font-bold white uppercase tracking-widest">
          About Us
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Welcome to Our Mosque Volunteer Platform!
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8">
        {[
          {
            title: "Our Mission",
            content:
              "Our mission is to foster a stronger, more connected mosque community by providing a platform where volunteers can engage in meaningful work that supports our shared values of compassion, service, and unity. This app streamlines volunteer opportunities, making it easy for community members to give back, gain rewarding experiences, and earn points for their contributions."
          },
          {
            title: "What We Do",
            content:
              "Our platform helps volunteers connect with mosque tasks and events. From setting up Friday prayer arrangements to organizing special events, our app makes it easy to find opportunities that suit your schedule and interests."
          },
          {
            title: "Why Volunteer?",
            content:
              "Volunteering at the mosque brings people together. Each task completed helps the mosque run smoothly and brings us closer as a community. Whether it's helping with event setup, managing parking, or assisting in community outreach, every act of service counts."
          },
          {
            title: "Our Community",
            content:
              "We welcome everyone to join and make a difference, whether you're a regular attendee or new to the community. Together, we can create a welcoming environment and help each other thrive."
          }
        ].map((section, index) => (
          <motion.div
            key={index}
            className="bg-base-300 shadow-lg p-8 rounded-lg"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              {section.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <p className="text-xl text-primary font-semibold">
          Join us in making a difference in our community!
        </p>
        <button
          className="mt-6 btn btn-primary px-8 py-3 rounded-full text-lg"
          onClick={() => (window.location.href = "/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
