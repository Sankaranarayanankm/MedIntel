import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock3 } from "lucide-react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>

          <p className="mt-5 text-lg text-blue-100">
            Have questions? Need support or appointment assistance? We're here
            to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">
        {/* Left - Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Send Us a Message
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Fill out the form and our healthcare team will contact you shortly.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone Number</label>

              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>

              <textarea
                rows="5"
                placeholder="Write your message"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSendMessage}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-blue-600" />

                <div>
                  <h4 className="font-semibold">Phone Number</h4>
                  <p className="text-gray-500">+91 8086902974</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-blue-600" />

                <div>
                  <h4 className="font-semibold">Email Address</h4>
                  <p className="text-gray-500">medintel@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-blue-600" />

                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-500">Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-5">
              <Clock3 className="text-blue-600" />
              <h3 className="text-2xl font-bold">Working Hours</h3>
            </div>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>

              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>

              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
