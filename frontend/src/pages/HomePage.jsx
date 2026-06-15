import React from "react";
import {
  CalendarDays,
  ShieldCheck,
  Stethoscope,
  Users,
  HeartPulse,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";

const HomePage = ({ services }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              Trusted Healthcare Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight text-gray-900">
              Smart Healthcare for a
              <span className="text-blue-600"> Better Tomorrow</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              Book appointments, manage prescriptions, access healthcare
              services, and connect with trusted medical professionals — all in
              one place.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => navigate("/patient/doctors")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Book Appointment
              </button>

              <button
                onClick={() => navigate("/patient/services")}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6">
              Why Patients Trust Us
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Trusted Medical Care</h4>
                  <p className="text-gray-500 text-sm">
                    Experienced doctors and secure patient care.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock3 className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Fast Appointment Booking</h4>
                  <p className="text-gray-500 text-sm">
                    Schedule doctor visits quickly and easily.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <HeartPulse className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Quality Healthcare</h4>
                  <p className="text-gray-500 text-sm">
                    Modern treatments and patient-first care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users />,
              title: "10K+",
              subtitle: "Happy Patients",
            },
            {
              icon: <Stethoscope />,
              title: "150+",
              subtitle: "Expert Doctors",
            },
            {
              icon: <CalendarDays />,
              title: "25K+",
              subtitle: "Appointments",
            },
            {
              icon: <HeartPulse />,
              title: "24/7",
              subtitle: "Healthcare Support",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <div className="flex justify-center text-blue-600 mb-4">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold">{item.title}</h3>

              <p className="text-gray-500 mt-2">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Our Healthcare Services</h2>
            <p className="text-gray-500 mt-3">
              Quality healthcare services designed for your well-being.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {services?.map((service) => (
              <div
                key={service._id}
                className="min-w-[300px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition shrink-0"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h4 className="font-semibold text-lg">{service.name}</h4>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {service.about}
                  </p>

                  <button
                    onClick={() => navigate(`/patient/services/${service._id}`)}
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Why Choose MedIntel?</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              "Expert medical professionals",
              "Easy appointment management",
              "Secure healthcare platform",
            ].map((text) => (
              <div key={text} className="p-8 rounded-2xl bg-blue-50">
                <h4 className="font-semibold text-xl">{text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Take Charge of Your Health Today
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Book appointments, access healthcare services, and connect with
            trusted doctors in minutes.
          </p>

          <button
            onClick={() => navigate("/patient/login")}
            className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
