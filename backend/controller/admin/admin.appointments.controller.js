import {
  adminCancelAppoinmentService,
  deleteAppoinmentService,
  getAppoinmentService,
} from "../../services/admin/admin.appointments.service.js";

export const getAppoinmentsController = async (req, res, next) => {
  try {
    const appoinments = await getAppoinmentService();
    return res.status(200).json({ success: true, data: appoinments });
  } catch (err) {
    next(err);
  }
};
  
export const adminCancelAppoinmentsController = async (req, res, next) => {
  try {
    const { appoinmentId } = req.params;
    await adminCancelAppoinmentService(appoinmentId);
    return res
      .status(200)
      .json({ success: true, message: "cancelled this appoinment" });
  } catch (err) {
    next(err);
  }
};

export const deleteAppoinmentsController = async (req, res, next) => {
  try {
    const { appoinmentId } = req.params;
    await deleteAppoinmentService(appoinmentId);
    res.status(200).json({ success: true, message: "appoinment deleted" });
  } catch (err) {
    next(err);
  }
};
