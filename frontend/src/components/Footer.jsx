import { ArrowRight, LocateIcon, Mail, Phone } from "lucide-react";
import React from "react";
import { DUMMY_SERVICES } from "../DUMMY/data";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-5">
          <div>
            <h4 className="text-2xl font-bold text-white">MedIntel</h4>
            <p className="text-sm text-blue-400">Healthcare Solutions</p>
          </div>

          <p className="text-sm leading-6 text-gray-400">
            Delivering trusted healthcare services with expert doctors,
            appointments, diagnostics, and patient care management.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+91 8086902974</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>medintel@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <LocateIcon size={18} />
              <span>Kerala, India</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-5">Quick Links</h5>

          <div className="flex flex-col gap-3">
            {["Home", "Doctors", "Services", "Contact", "Appointments"].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition"
                >
                  <ArrowRight size={16} />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-5">
            Our Services
          </h5>

          <div className="flex flex-col gap-3">
            {DUMMY_SERVICES.slice(0, 4).map((item) => (
              <span
                key={item.id}
                className="flex items-center gap-2 hover:text-white transition cursor-pointer"
              >
                <ArrowRight size={16} />
                {item.name}
              </span>
            ))}
          </div>

          <button className="mt-4 text-blue-400 hover:text-blue-300 transition">
            View More
          </button>
        </div>

        {/* Social */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-5">
            Stay Connected
          </h5>

          <p className="text-sm text-gray-400 mb-5">
            Follow us on social media for updates, health tips, and
            announcements.
          </p>

          <div className="flex items-center gap-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-white transition" />
            <FaTwitter className="cursor-pointer hover:text-white transition" />
            <FaInstagram className="cursor-pointer hover:text-white transition" />
            <FaLinkedin className="cursor-pointer hover:text-white transition" />
            <FaYoutube className="cursor-pointer hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 py-5 text-center text-sm text-gray-400">
        <p>© 2026 MedIntel Healthcare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
