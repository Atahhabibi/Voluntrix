import axios from "axios";
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactPage = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const data = { name, email, message };

    try {
      if (!name || !email || !message) {
        toast.warn("All input field required");
        return;
      }
      const response = await axios.post("https://formspree.io/f/manybdpr", data);
      toast.success("Message send successfully");
      form.reset(); 
    } catch (error) {
      console.log(error);
      toast.error("something went wrong try again!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-base-100 rounded-xl shadow-lg p-8 md:flex md:gap-8">
        {/* Contact Details Section without Card */}
        <div className="md:w-1/2 p-6">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-primary text-center mb-6 uppercase">
              Contact Details
            </h2>
            <div className="space-y-6">
              {/* Visit Us */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-yellow-400 p-3 rounded-lg shadow-md">
                <FaMapMarkerAlt className="text-white text-3xl" />
                <div>
                  <p className="text-lg font-semibold text-white">Visit Us</p>
                  <p className="text-white">
                    1234 Mosque Street, Your City, State, Zip
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-green-400 to-green-500 p-3 rounded-lg shadow-md">
                <FaPhoneAlt className="text-white text-3xl" />
                <div>
                  <p className="text-lg font-semibold text-white">Call Us</p>
                  <p className="text-white">(123) 456-7890</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-lg shadow-md">
                <FaEnvelope className="text-white text-3xl" />
                <div>
                  <p className="text-lg font-semibold text-white">Email Us</p>
                  <p className="text-white">support@mosquevolunteers.com</p>
                </div>
              </div>
            </div>

            {/* Additional Description Inside the Section */}
            <div className="mt-8 text-white">
              <p className="text-sm lg:text-lg">
                We are always happy to assist you! Whether you have questions
                about our events, need information on how to get involved, or
                have any other inquiries, don't hesitate to reach out. Our team
                is dedicated to making sure your experience with us is smooth
                and rewarding. We encourage you to visit us at the mosque or
                contact us via phone or email for any assistance. We value your
                contributions and look forward to connecting with you.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2 p-6 border-l border-base-300">
          <h2 className="text-3xl font-semibold text-primary mb-4 text-center uppercase">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base-content font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Name"
                name="name"
                required
              />
            </div>
            <div>
              <label className="block text-base-content font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Your Email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="block text-base-content font-semibold mb-2">
                Message
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-56"
                placeholder="Your Message"
                name="message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full py-2 text-lg rounded-full hover:bg-primary-focus"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
