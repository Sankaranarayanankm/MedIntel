import { ArrowRight, LocateIcon, Mail, Phone } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utls/axios";
import { useNavigate } from "react-router-dom";

const Footer = ({ role = "patient" }) => {
  const navigate = useNavigate();
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/services");
      return response.data?.data;
    },
  });
  const routes = {
    home: "/",
    contact: "/contact",
    doctors: "/patient/doctors",
    services: "/patient/services",
  };
  if (isLoading) return null;

  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col lg:flex-row justify-between gap-12">
        {/* Brand */}
        <div className="w-full lg:w-1/4 space-y-5">
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

        {/* Middle Section (Links + Services grouped) */}
        {role == "patient" && (
          <div className="flex flex-1 justify-between gap-10">
            {/* Quick Links */}
            <div className="min-w-[150px]">
              <h5 className="text-lg font-semibold text-white mb-5">
                Quick Links
              </h5>

              <div className="flex flex-col gap-3">
                {["Home", "Doctors", "Services", "Contact"].map((item) => (
                  <span
                    onClick={() => {
                      const path = routes[item.toLocaleLowerCase()];
                      navigate(path);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    key={item}
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition"
                  >
                    <ArrowRight size={16} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="min-w-[200px]">
              <h5 className="text-lg font-semibold text-white mb-5">
                Our Services
              </h5>

              <div className="flex flex-col gap-3">
                {services?.slice(0, 4).map((item) => (
                  <span
                    onClick={() => {
                      navigate(`/patient/services/${item._id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    key={item._id}
                    className="flex items-center gap-2 hover:text-white transition cursor-pointer"
                  >
                    <ArrowRight size={16} />
                    {item.name}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  navigate("/patient/services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-4 text-blue-400 hover:text-blue-300 transition"
              >
                View More
              </button>
            </div>
          </div>
        )}

        {/* Social */}
        <div className="w-full lg:w-1/4">
          <h5 className="text-lg font-semibold text-white mb-5">
            Stay Connected
          </h5>

          <p className="text-sm text-gray-400 mb-5">
            Follow us on social media for updates, health tips, and
            announcements.
          </p>

          <div className="flex items-center gap-4 text-2xl">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 py-5 text-center text-sm text-gray-400">
        © 2026 MedIntel Healthcare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
