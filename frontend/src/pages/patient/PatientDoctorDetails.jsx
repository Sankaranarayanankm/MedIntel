import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeartPulse, Stethoscope, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utls/axios";

const PatientDoctorDetails = () => {
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [timeSlot, setTimeSlot] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const doctors = queryClient.getQueryData(["doctors"]);
  const { doctorId } = params;
  const doctor = doctors?.find((item) => item._id === doctorId);

  const handleBookAppointment = (id) => {
    const obj = {
      reason,
      paymentMethod,
      timeSlot,
    };
    console.log(obj, "obj");
    console.log(id, "id");
    bookAppointment({ id, data: obj });
  };
  const { mutate: bookAppointment, isPending } = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.post(
        `/patient/book-appoinment/${id}`,
        data,
      );
      return response?.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "failed to book appointment"),
  });
  const doctorProfileItem = (icon, value, suffix, label) => (
    <div className="bg-blue-50 rounded-xl p-3 text-center">
      <div className="flex justify-center text-blue-600 mb-2">{icon}</div>
      <p className="font-bold text-gray-800">
        {value}
        {suffix}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Doctor Profile */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image + Stats */}
          <div className="flex flex-col items-center">
            <img
              src={doctor?.image}
              alt={doctor?.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 shadow-lg"
            />

            <div className="grid grid-cols-3 gap-3 mt-6 w-full">
              {doctorProfileItem(
                <HeartPulse size={20} />,
                doctor?.successRate,
                "%",
                "Success",
              )}

              {doctorProfileItem(
                <Stethoscope size={20} />,
                doctor?.experience,
                " Yrs",
                "Experience",
              )}

              {doctorProfileItem(
                <Users size={20} />,
                doctor?.patients,
                "+",
                "Patients",
              )}
            </div>
          </div>

          {/* Doctor Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{doctor?.name}</h1>

            <p className="text-xl text-blue-600 font-medium mt-2">
              {doctor?.specialization}
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Qualification:</span>{" "}
                {doctor?.qualification}
              </p>

              <p>
                <span className="font-semibold">Consultation Fee:</span> ₹
                {doctor?.fee}
              </p>

              <p>
                <span className="font-semibold">Availability:</span>{" "}
                <span
                  className={`font-medium ${
                    doctor?.availability === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {doctor?.availability}
                </span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">About Doctor</h3>

              <p className="text-gray-600 leading-relaxed">{doctor?.about}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Book Your Appointment
        </h2>

        <div>
          <p className="font-medium text-gray-700 mb-4">Available Time Slots</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {doctor?.scheduleSlots.map((item) => (
              <button
                key={item}
                onClick={() => setTimeSlot(item)}
                className={`px-4 py-2 rounded-xl border transition ${
                  timeSlot === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="block font-medium text-gray-700 mb-2">
            Reason for Consultation
          </label>

          <textarea
            rows={4}
            value={reason}
            placeholder="Enter your reason for consultation..."
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Summary */}
          <div className="mt-6 bg-gray-50 border rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3">
              Appointment Summary
            </h3>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Doctor:</span> {doctor?.name}
              </p>

              <p>
                <span className="font-medium">Speciality:</span>{" "}
                {doctor?.specialization}
              </p>

              <p>
                <span className="font-medium">Selected Slot:</span>{" "}
                {timeSlot || "Not Selected"}
              </p>

              <p>
                <span className="font-medium">Consultation Fee:</span> ₹
                {doctor?.fee}
              </p>

              <p>
                <span className="font-medium">Reason:</span>{" "}
                {reason || "Not Provided"}
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <p className="font-medium text-gray-700 mb-3">Payment Method</p>

              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "online"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />

                  <div className="text-center">
                    <p className="font-medium">💳 Online</p>
                    <p className="text-xs text-gray-500 mt-1">
                      UPI / Card / Net Banking
                    </p>
                  </div>
                </label>

                <label
                  className={`border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "cash"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />

                  <div className="text-center">
                    <p className="font-medium">💵 Cash</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Pay at Hospital
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleBookAppointment(doctorId)}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDoctorDetails;
