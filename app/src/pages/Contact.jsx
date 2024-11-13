import React from "react";

const ContactPage = () => {
  return (
    <div
      className="bg-base-200 flex items-center justify-center p-6"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-xl p-8 md:flex">
        {/* Contact Information Section */}
        <div className="md:w-1/2 p-4 md:border-r md:border-base-300">
          <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-base-content mb-6">
            If you have any questions or need assistance, feel free to reach out
            to us!
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>1234 Mosque Street, Your City, State, Zip</p>
            </div>
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>(123) 456-7890</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@mosquevolunteers.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2 p-4">
          <form className="space-y-4">
            <div>
              <label className="block text-base-content font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-base-content font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-base-content font-bold mb-2">
                Message
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
