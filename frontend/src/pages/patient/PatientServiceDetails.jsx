import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATIENT_SERVICES } from "../../DUMMY/PATIENT";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utls/axios";

const PatientServiceDetails = () => {
  const [booking, setBooking] = useState("online");
  const [slot, setSlot] = useState("");
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const params = useParams();
  const { serviceId } = params;
  const services = queryClient.getQueryData(["services"]);
  const user = queryClient.getQueryData(["authUser"]);
  const service = services?.find((item) => item._id === serviceId);
  const { mutate: bookService, isPending } = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.post(
        `/patient/services/${id}`,
        data,
      );
      return response.data?.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        navigate("/patient/appointments");
        toast.success("booked appointment");
      }
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "failed to book service"),
  });
  const handleBookService = () => {
    const obj = {
      paymentMethod: booking,
      timeSlot: slot,
    };
    if (!user) {
      toast.error("Login to book appointment");
      return;
    }
    // console.log(obj);
    bookService({ id: serviceId, data: obj });
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div>
            <img
              src={service?.image}
              alt={service?.name}
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {service?.name}
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {service?.about}
            </p>

            <div className="mt-4 inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-xl font-semibold">
              ₹ {service?.price}
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Instructions
              </h4>

              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                {service?.instructions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Slot Selection */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Select Appointment Slot
              </h4>

              <div className="grid gap-3">
                {service?.scheduleSlots.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSlot(item)}
                    className={`border rounded-xl p-3 text-left transition font-medium
        ${
          slot === item
            ? "bg-blue-600 text-white border-blue-600 shadow-md"
            : "bg-white hover:border-blue-500 hover:bg-blue-50"
        }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Payment Method */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Payment Method
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label
                    className={`border rounded-xl p-4 cursor-pointer transition flex items-center gap-3
        ${
          booking === "online"
            ? "border-blue-600 bg-blue-50"
            : "hover:border-blue-500"
        }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={booking === "online"}
                      onChange={(e) => setBooking(e.target.value)}
                    />
                    <span className="font-medium">Online Payment</span>
                  </label>

                  <label
                    className={`border rounded-xl p-4 cursor-pointer transition flex items-center gap-3
        ${
          booking === "cash"
            ? "border-blue-600 bg-blue-50"
            : "hover:border-blue-500"
        }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={booking === "cash"}
                      onChange={(e) => setBooking(e.target.value)}
                    />
                    <span className="font-medium">Cash Payment</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <div className="bg-gray-50 border rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-5">
                  Booking Summary
                </h4>

                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Name</span>
                    <span className="font-medium">Username</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mobile</span>
                    <span className="font-medium">User Mobile</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Service</span>
                    <span className="font-medium">{service?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Selected Slot</span>
                    <span className="font-medium">
                      {slot || "Not Selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium">
                      {booking || "Not Selected"}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-green-600 pt-3 border-t">
                    <span>Total Amount</span>
                    <span>₹ {service?.price}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookService}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientServiceDetails;
