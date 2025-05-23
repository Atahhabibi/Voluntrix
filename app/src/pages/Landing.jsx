import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../images/mosque-1.jpg";
import img2 from "../images/mosque-2.jpg";
import img3 from "../images/mosque-3.jpg";
import img4 from "../images/mosque-4.jpg";
import img5 from "../images/mosque-5.jpg";
import { Pagination, Autoplay } from "swiper/modules";
import {
  FaUserPlus,
  FaTasks,
  FaClock,
  FaMedal,
  FaCalendarAlt
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { customFetchForAll } from "../util/customFetch";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../util/dataHandlingFunctions";


const fetchEventsTasks = async () => {
  try {
    const resp = await customFetchForAll("/taskEventForAll");

    const tasksAndEventsForALL = resp.data;
    return tasksAndEventsForALL;
  } catch (error) {
    console.error("Error loading tasks and events:", error.message);
  }
};

const mosqueImages = [img1, img2, img3, img4, img5];

const Landing = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["taskEventForAll"],
    queryFn: fetchEventsTasks
  });

  const navigate=useNavigate(); 

  

  const tasks = data?.data?.tasks || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white text-center py-20">
        <h1 className="text-4xl font-extrabold tracking-wide mb-4">
          Welcome to Our Mosque Volunteer Platform
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-8">
          Join hands in organizing tasks and building a stronger mosque
          community through meaningful service.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="btn btn-primary px-6 py-2 rounded-lg hover:shadow-lg transition"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline px-6 py-2 text-white border-white rounded-lg hover:bg-gray-300 hover:text-gray-800 transition"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="relative w-full h-96">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full h-full"
        >
          {mosqueImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Mosque Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40">
          <h2 className="text-4xl font-bold mb-4">Our Mosque Gallery</h2>
          <p className="text-lg">Experience the beauty of our community.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            {
              step: "Sign Up",
              icon: <FaUserPlus />,
              description: "Create an account to get started."
            },
            {
              step: "Find a Task",
              icon: <FaTasks />,
              description: "Browse tasks that fit your interests."
            },
            {
              step: "Clock In/Out",
              icon: <FaClock />,
              description: "Log your hours to track contributions."
            },
            {
              step: "Earn Points",
              icon: <FaMedal />,
              description: "Gain points for every hour of service."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl text-blue-400 mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg text-white mb-2">
                {item.step}
              </h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Tasks Section */}
      <section className="py-16 bg-gray-900 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">Upcoming Tasks</h2>
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {tasks.slice(0, 3).map((task, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-lg p-6 rounded-lg hover:shadow-xl transition"
              >
                <div className="flex items-center justify-center mb-4 text-gray-200">
                  <span className="text-2xl mr-2">
                    <FaCalendarAlt />
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold">{task.name}</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  <strong>Date:</strong> {formatDate(task.date)}
                </p>
                <p className="text-gray-300">
                  <strong>Points:</strong>{" "}
                  <span className="text-blue-400">{task.points}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-300">
            No tasks available at the moment.
          </p>
        )}
        <button
          className="btn btn-primary btn-md mt-8 px-6 py-2 rounded-lg"
          onClick={() => navigate("/tasks")}
        >
          View All Tasks
        </button>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Join our community of dedicated volunteers!
        </h2>
        <p className="text-lg mb-8">
          Make a difference by helping out at the mosque. Every small act
          counts!
        </p>
        <button
          className="btn btn-primary btn-md px-6 py-2 rounded-lg"
          onClick={() => navigate("/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default Landing;
