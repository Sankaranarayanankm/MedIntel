import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utls/axios";
import toast from "react-hot-toast";

const AdminServiceCard = (props) => {
  const {
    name,
    image,
    price,
    availability,
    about,
    instructions,
    scheduleSlots,
    _id,
  } = props;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteService, isPending } = useMutation({
    mutationFn: async (id) => axiosInstance.delete(`/admin/services/${id}`),
    onSuccess: () => {
      toast.success("deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "failed to delete "),
  });
  // console.log(props);
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img src={image} alt={name} className="w-full h-56 object-cover" />

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-gray-800">{name}</h4>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              availability === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {availability === "available" ? "available" : "unavailable"}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{about}</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Price</p>
            <p className="font-bold text-blue-600">₹{price}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Instructions</p>
            <p className="font-bold text-green-600">
              {instructions?.length || 0}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Slots</p>
            <p className="font-bold text-purple-600">
              {scheduleSlots?.length || 0}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate("/admin/add-service", { state: { data: props } })
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => deleteService(_id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceCard;
