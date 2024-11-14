import React from "react";
import { useNavigate } from "react-router-dom";
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

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-300 text-base-content">
      {/* Hero Section */}
      <section className="bg-base-200 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Mosque Volunteer Platform
        </h1>
        <p className="text-lg mb-8">
          An app dedicated to organizing volunteer tasks and helping the mosque
          community flourish through service.
        </p>
        <div className="space-x-4">
          <button
            className="btn btn-accent btn-lg"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-800"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="relative w-full h-96">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-full"
        >
          {mosqueImages.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center w-96 h-96"
            >
              <img
                src={src}
                alt={`Mosque Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
          <h2 className="text-4xl font-bold mb-4">Our Mosque Gallery</h2>
          <p className="text-lg mb-8">
            Experience the beauty of our community.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
          {["Sign Up", "Find a Task", "Clock In/Out", "Earn Points"].map(
            (step, index) => (
              <div
                key={index}
                className="flex flex-col items-center h-24 bg-base-300 p-4 md:p-6 rounded-xl shadow-lg md:h-40 lg:h-56"
              >
                <div className="bg-blue-400 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-base md:text-lg text-gray-200 mb-2">
                  {step}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm text-center hidden md:block pb-2">
                  {
                    [
                      "Create an account to get started.",
                      "Browse tasks that fit your interests.",
                      "Log your hours to keep track of contributions.",
                      "Gain points for every hour of service."
                    ][index]
                  }
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Upcoming Events/Tasks Section */}
      <section className="py-16 bg-base-300 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">
          Upcoming Events & Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              title: "Friday Prayer Setup",
              date: "Next Friday, 3:00 PM",
              points: 10
            },
            {
              title: "Eid Parking Management",
              date: "Eid Morning, 8:00 AM",
              points: 20
            },
            {
              title: "Community Iftar Preparation",
              date: "Tomorrow, 5:30 PM",
              points: 15
            }
          ].map((task, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg p-8 rounded-xl transition duration-300 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-400 mb-1">
                Date: <span className="font-medium">{task.date}</span>
              </p>
              <p className="text-gray-400">
                Points:{" "}
                <span className="font-medium text-primary">{task.points}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          className="btn bg-blue-500 text-white mt-12 px-8 py-1 text-lg font-semibold rounded-full hover:bg-primary-focus hover:bg-green-100 hover:text-black transition duration-300"
          onClick={() => navigate("/tasks")}
        >
          View All Tasks
        </button>
      </section>

      {/* Call to Action Section */}
      <section className="bg-base-200 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Join our community of dedicated volunteers!
        </h2>
        <p className="text-lg mb-8">
          Make a difference by helping out at the mosque. Every small act
          counts!
        </p>
        <button
          className="btn btn-accent btn-lg"
          onClick={() => navigate("/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default Landing;
