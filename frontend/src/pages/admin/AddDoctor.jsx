import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsCalendar, BsTrash, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utls/axios";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [period, setPeriod] = useState("AM");
  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [input, setInput] = useState({
    image: "",
    name: "",
    specialization: "",
    location: "",
    experience: "",
    qualification: "",
    fee: "",
    rating: "",
    patients: "",
    successRate: "",
    email: "",
    password: "",
    availability: "",
    about: "",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //* ADD DOCTOR
  const { mutate: addDoctor, isPending: addingDoctor } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("admin/doctors", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Doctor Added");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      navigate("/admin/doctors");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "failed to add doctor"),
  });

  const handleScheduleSlots = () => {
    if (!date || !hour || !min) {
      toast.error("Please fill all slot fields");
      return;
    }
    const time = `${hour}:${min.padStart(2, "0")} ${period}`;
    let str = date + " " + time;

    if (scheduleSlots.includes(str)) {
      toast.error("Slot already exists");
      return;
    }
    setScheduleSlots((prev) => [...prev, str]);
    setDate("");
    setHour("");
    setMin("");
    setPeriod("AM");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setInput((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (scheduleSlots.length === 0) {
      toast.error("Please add at least one schedule slot");
      return;
    }
    if (!input.image) {
      toast.error("Please upload a doctor image");
      return;
    }
    const obj = {
      ...input,
      doctorEmail: input.email,
      scheduleSlots,
    };

    addDoctor(obj);
  };
  const inputSection = (type, label, value, name) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleInput}
          placeholder={label}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />
      ) : type === "file" ? (
        <>
          <input
            name={name}
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          {input.image && (
            <img
              src={input.image}
              alt="preview"
              className="mt-3 w-32 h-32 object-cover rounded-xl border"
            />
          )}
        </>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={handleInput}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );

  const deleteSlot = (item) => {
    const updated = scheduleSlots.filter((slot) => slot !== item);
    setScheduleSlots(updated);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl text-blue-600">
          <BsPerson />
        </span>

        <h2 className="text-3xl font-bold text-gray-800">Add New Doctor</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* INPUT SECTIONS */}
        <div className="md:col-span-2">
          {inputSection("file", "Upload Image", input.image, "image")}
        </div>

        {inputSection("text", "Full Name", input.name, "name")}
        {inputSection("text", "Doctor Email", input.email, "email")}
        {inputSection(
          "text",
          "Specialization",
          input.specialization,
          "specialization",
        )}
        {inputSection("text", "Location", input.location, "location")}
        {inputSection("text", "Experience", input.experience, "experience")}
        {inputSection(
          "text",
          "Qualification",
          input.qualification,
          "qualification",
        )}
        {inputSection(
          "text",
          "Success Rate (%)",
          input.successRate,
          "successRate",
        )}
        {inputSection("text", "Consultation Fee", input.fee, "fee")}
        {inputSection("text", "Rating (1-5)", input.rating, "rating")}
        {inputSection("text", "Patients Consulted", input.patients, "patients")}
        {inputSection(
          "password",
          "Doctor Password",
          input.password,
          "password",
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>

          <select
            name="availability"
            value={input.availability}
            onChange={handleInput}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Choose Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="md:col-span-2">
          {inputSection("textarea", "About Doctor", input.about, "about")}
        </div>

        {/* ADD SCHEDULE SLOTS  */}
        <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <span className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <BsCalendar className="text-blue-600" />
            Add Schedule Slots
          </span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Hour"
              value={hour}
              min="1"
              max="12"
              onChange={(e) => {
                const value = e.target.value;

                if (
                  value === "" ||
                  (Number(value) >= 1 && Number(value) <= 12)
                ) {
                  setHour(value);
                }
              }}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Minute"
              value={min}
              min="0"
              max="59"
              onChange={(e) => {
                const value = e.target.value;

                if (
                  value === "" ||
                  (Number(value) >= 0 && Number(value) <= 59)
                ) {
                  setMin(value);
                }
              }}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          <button
            onClick={handleScheduleSlots}
            type="button"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition cursor-pointer"
          >
            Add Slot
          </button>

          {/* Display Slots */}
          <ul className="flex flex-wrap gap-3 mt-5">
            {scheduleSlots.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
              >
                <span>{item}</span>

                <button
                  onClick={() => deleteSlot(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <BsTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={addingDoctor}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            {addingDoctor ? "Adding Doctor..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
