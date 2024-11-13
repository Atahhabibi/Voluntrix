import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from '../images/mosque-1.jpg'
import img2 from '../images/mosque-2.jpg'
import img3 from '../images/mosque-3.jpg'
import img4 from '../images/mosque-4.jpg'
import img5 from '../images/mosque-5.jpg'

// Import modules directly from 'swiper'
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Updated import path for modules

const mosqueImages = [
  img1,img2,img3,img4,img5
  // Add more image paths as needed
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-20">
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
            className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary"
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
        {/* Overlay Text/Button (optional) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
          <h2 className="text-4xl font-bold mb-4">Our Mosque Gallery</h2>
          <p className="text-lg mb-8">
            Experience the beauty of our community.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {["Sign Up", "Find a Task", "Clock In/Out", "Earn Points"].map(
            (step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step}</h3>
                <p className="text-gray-600">
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
      <section className="py-16 bg-gray-100 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events & Tasks</h2>
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
              className="card bg-base-100 shadow-md p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600">Date: {task.date}</p>
              <p className="text-gray-600">Points: {task.points}</p>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary mt-8"
          onClick={() => navigate("/tasks")}
        >
          View All Tasks
        </button>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white text-center py-16">
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
