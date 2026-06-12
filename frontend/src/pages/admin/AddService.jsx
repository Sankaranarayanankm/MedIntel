import { Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { useLocation } from "react-router-dom";
    
const AddService = () => {
  const [instructions, setInstructions] = useState([]);
  const [scheduleSlots, setScheduleSlots] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [period, setPeriod] = useState("AM");
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    availability: "available",
    about: "",
  });
  const location = useLocation();
  const editData = location.state?.data;

  useEffect(() => {
    if (editData) {
      setInstructions(editData.instructions || []);
      setScheduleSlots(editData.scheduleSlots || []);
      setInput({
        name: editData.name || "",
        image: editData.image || "",
        price: editData.price || "",
        availability: editData.availability || "",
        about: editData.about || "",
      });
    }
  }, [editData]);
  const handleAddService = () => {
    console.log(input, "input");
    console.log(scheduleSlots, "time slots");
    console.log(instructions, "instructions");
    console.log(date, "date");
    console.log(hour, "hour");
    console.log(min, "min");
  };
  const resetForm = () => {
    setScheduleSlots([]);
    setInstructions([]);
    setInput({
      name: "",
      image: "",
      price: "",
      availability: "",
      about: "",
    });
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
  const handleInstructions = () => {
    if (!instructions.includes(instruction)) {
      setInstructions((prev) => [...prev, instruction]);
    }
    setInstruction("");
    // show toast here
    console.log("instruction already added");
  };
  const handleSheduleSlots = () => {
    const time = `${hour}:${min.padStart(2, "0")}`;
    const slot = `${date}-${time}`;
    if (!scheduleSlots.includes(slot)) {
      setScheduleSlots((prev) => [...prev, slot]);
    }
    // else show toast
  };
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setInput((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };
  const serviceHandler = () => {
    // if editeddata?edit handler or add handler
  };
  const handleDeleteInstructions = (item) => {
    const updated = instructions.filter((instruction) => instruction !== item);
    setInstructions(updated);
  };
  const handleDeleteScheduleSlots = (item) => {
    const updated = scheduleSlots.filter((slot) => slot !== item);
    setScheduleSlots(updated);
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Add Service</h2>
          <p className="text-gray-500">
            Create a service with unique schedules and instructions
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
          Save Service
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Service Image</h3>

          <div className="w-full h-60 bg-gray-100 rounded-xl overflow-hidden mb-4">
            {input.image ? (
              <img
                src={input.image}
                alt={input.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image Selected
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImage}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6 space-y-6">
          {/* Service Name */}
          <div>
            <label className="block mb-2 font-medium">Service Name</label>

            <input
              type="text"
              name="name"
              placeholder="General Consultation"
              value={input.name}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Price & Availability */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Price</label>

              <input
                type="number"
                name="price"
                placeholder="₹499"
                value={input.price}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Availability</label>

              <select
                name="availability"
                value={input.availability}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block mb-2 font-medium">About Service</label>

            <textarea
              rows={4}
              name="about"
              value={input.about}
              onChange={handleInput}
              placeholder="Write a short description..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Instructions */}
          <div className="border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <label className="font-semibold">Instructions</label>

              <button
                onClick={handleInstructions}
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instruction"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />

            <ol className="list-decimal list-inside space-y-2">
              {instructions.map((item) => (
                <li
                  key={item}
                  className=" flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                >
                  {item}
                  <X
                    size={18}
                    onClick={() => handleDeleteInstructions(item)}
                    className="text-red-500"
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* Schedule */}
          <div className="border rounded-xl p-4 bg-gray-50">
            <h4 className="font-semibold mb-4">Schedule Slots</h4>

            <div className="grid md:grid-cols-4 gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="number"
                placeholder="Hour"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="number"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="border rounded-lg px-4 py-3"
              />

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border rounded-lg px-4 py-3"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            <button
              onClick={handleSheduleSlots}
              type="button"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              Add Time Slot
            </button>

            <div className="flex flex-wrap gap-2 mt-5">
              {scheduleSlots.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                >
                  {item}
                  <X
                    size={18}
                    onClick={() => handleDeleteScheduleSlots(item)}
                    className="text-red-500"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={handleAddService}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <BiSave size={18} />
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
