import {
  editDoctorDetailsService,
  getAllDoctorAppointmentService,
  getDoctorDetailsService,
  updateDoctorAppointmentService,
} from "../services/doctor.services.js";

export const getAllDoctorAppoinmentsController = async (req, res, next) => {
  try {   
    // console.log(req.user.id);
    const doctorId = req.user.id;
    const doctorAppoinments = await getAllDoctorAppointmentService(doctorId);

    res.status(200).json({ success: true, data: doctorAppoinments });
  } catch (err) {
    next(err);
  }
};

export const updateDoctorAppoinmentsController = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const { appoinmentId } = req.params;
    const { status } = req.body;
    await updateDoctorAppointmentService(status, doctorId, appoinmentId);
    res.status(200).json({ success: true, message: "updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getDoctorDetailsController = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const doctor = await getDoctorDetailsService(doctorId);
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

export const editDoctorDetailsController = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    const data = req.body;
    const doctor = await editDoctorDetailsService(doctorId, data);
    res.status(200).json({ success: true, message: "edited successfully" });
  } catch (err) {
    next(err);
  }
};
