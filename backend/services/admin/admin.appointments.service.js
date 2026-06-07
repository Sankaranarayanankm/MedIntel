import Appoinment from "../../models/appoinments.model.js";
import CustomError from "../../utls/customError.js";

export const getAppoinmentService = async () => {
  const appoinments = await Appoinment.find().lean();
  return appoinments;
};

export const adminCancelAppoinmentService = async (appoinmentId) => {
  const appoinment = await Appoinment.findOneAndUpdate(
    {
      _id: appoinmentId,
      status: "pending",
    },
    { adminCancel: true, status: "cancelled" },
    { returnDocument: "after", runValidators: true },
  );

  if (!appoinment) {
    throw new CustomError("appointment not found or already taken", 400);
  }
};

export const deleteAppoinmentService = async (appoinmentId) => {
  const appoinment = await Appoinment.findByIdAndDelete(appoinmentId);
  if (!appoinment) {
    throw new CustomError("appointment not found", 404);
  }
};
