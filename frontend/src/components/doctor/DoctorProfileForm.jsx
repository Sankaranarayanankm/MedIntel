import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../../utls/axios";
import toast from "react-hot-toast";

// change schedule slot from text t0 date -> text text
const DoctorProfileForm = (props) => {
  const [input, setInput] = useState({
    name: props.name || "",
    role: props.role || "doctor",
    image: props.image || "",
    specialization: props.specialization || "",
    experience: props.experience || "",
    doctorEmail: props.doctorEmail || "",
    availability: props.availability || "available",
    qualification: props.qualification || "",
    rating: props.rating || "",
    successRate: props.successRate || "",
    about: props.about || "",
    fee: props.fee || "",
  });
  const [slot, setSlot] = useState("");
  const [scheduleSlots, setScheduleSlots] = useState(props.scheduleSlots || []);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  const addSlot = () => {
    if (!slot.trim()) return;

    setScheduleSlots((prev) => [...prev, slot]);
    setSlot("");
  };
  const removeSlot = (index) => {
    setScheduleSlots((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = {
      ...input,
      scheduleSlots,
    };
    props.updateProfile(doctorData);
    console.log(doctorData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8"
    >
      <h2 className="text-2xl font-bold mb-8">Doctor Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="doctorEmail"
            value={input.doctorEmail}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className="w-full border rounded-lg px-4 py-3"
          />
          {input.image && (
            <img
              src={input.image}
              alt="preview"
              className="w-32 h-32 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={input.specialization}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={input.qualification}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            value={input.experience}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Consultation Fee</label>
          <input
            type="number"
            name="fee"
            value={input.fee}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={input.rating}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Success Rate (%)</label>
          <input
            type="number"
            name="successRate"
            value={input.successRate}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Availability</label>
          <select
            name="availability"
            value={input.availability}
            onChange={handleInput}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">About</label>

        <textarea
          rows="5"
          name="about"
          value={input.about}
          onChange={handleInput}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Schedule Slots */}
      <div className="mt-8">
        <h3 className="font-semibold mb-3">Schedule Slots</h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="12/01/2025 - 10:10 AM"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            type="button"
            onClick={addSlot}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {scheduleSlots.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
      >
        Save Profile
      </button>
    </form>
  );
};

export default DoctorProfileForm;
