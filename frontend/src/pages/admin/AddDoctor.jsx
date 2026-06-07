import React, { useEffect, useState } from "react";
import { BsCalendar, BsTrash, BsPerson } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
// date,hour,min,period
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
    experiance: "",
    qualifications: "",
    fee: "",
    rating: "",
    patients: "",
    successRate: "",
    email: "",
    password: "",
    availablity: "",
    about: "",
  });
  const location = useLocation();
  const doctor = location.state?.doctor;

  useEffect(() => {
    if (doctor) {
      setInput({
        image: doctor.image || "",
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        location: doctor.location || "",
        experiance: doctor.experiance || "",
        qualifications: doctor.qualifications || "",
        fee: doctor.fee || "",
        rating: doctor.rating || "",
        patients: doctor.patients || "",
        successRate: doctor.successRate || "",
        email: doctor.doctorEmail || "",
        password: doctor.password || "",
        availablity: doctor.availablity || "",
        about: doctor.about || "",
      });
      setScheduleSlots(doctor.scheduleSlots);
    }
  }, [doctor]);
  

  const handleScheduleSlots = () => {
    const time = `${hour}:${min.padStart(2, "0")} ${period}`;
    let str = date + " " + time;

    if (scheduleSlots.includes(str)) {
      // show toast here
      return;
    }
    setScheduleSlots((prev) => [...prev, str]);
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
    // doctor?editdoctorhandler:adddoctorhandler
    console.log(input);
    console.log(scheduleSlots);
  };
  const inputSection = (type, placeholder, value, name) => (
    <div>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />
      ) : type == "file" ? (
        <input
          name={name}
          type="file"
          onChange={handleInput}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
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
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>

          {inputSection("file", "Choose File", input.image, "image")}
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
        {inputSection("text", "Experience", input.experiance, "experiance")}
        {inputSection(
          "text",
          "Qualifications",
          input.qualifications,
          "qualifications",
        )}
        {inputSection("text", "Success Rate", input.successRate, "successRate")}
        {inputSection("text", "Consultation Fee", input.fee, "fee")}
        {inputSection("text", "Rating (1-5)", input.rating, "rating")}
        {/* no of patients consulted  */}
        {inputSection("text", "Patients", input.patients, "patients")}
        {inputSection(
          "password",
          "Doctor Password",
          input.password,
          "password",
        )}

        <div>
          <select
            name="availablity"
            id="availablity"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Doctor
          </label>

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
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          <button
            onClick={handleScheduleSlots}
            type="button"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
