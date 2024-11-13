import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary uppercase">About Us</h1>
        <p className="text-lg text-indigo-200 mt-4">
          Welcome to Our Mosque Volunteer Platform!
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="card bg-base-100 shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Our Mission
          </h2>
          <p className="text-slate-300">
            Our mission is to foster a stronger, more connected mosque community
            by providing a platform where volunteers can easily engage in
            meaningful work that supports our shared values of compassion,
            service, and unity. This app was created to streamline volunteer
            opportunities, making it easy for community members to give back,
            gain rewarding experiences, and earn points for their contributions.
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">What We Do</h2>
          <p className="text-slate-300">
            Our platform is designed to help volunteers connect with mosque
            tasks and events. From setting up Friday prayer arrangements to
            organizing special events, our app makes it easy to find
            opportunities that suit your schedule and interests.
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Why Volunteer?
          </h2>
          <p className="text-slate-300">
            Volunteering at the mosque brings people together. Each task
            completed helps the mosque run smoothly and brings us all closer as
            a community. Whether it's helping with event setup, managing
            parking, or assisting in community outreach, every act of service
            counts.
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Our Community
          </h2>
          <p className="text-slate-300">
            We welcome everyone to join and make a difference, whether you're a
            regular attendee or new to the community. Together, we can create a
            welcoming environment and help each other thrive.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-12">
        <p className="text-xl text-blue-200 font-semibold">
          Join us in making a difference in our community!
        </p>
        <button
          className="mt-6 btn btn-primary"
          onClick={() => (window.location.href = "/register")}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
