import Patient from "../models/patient.model.js";
import ServiceBooking from "../models/serviceBooking.model.js";
import Appoinment from "../models/appoinments.model.js";
import Stripe from "stripe";
import Doctor from "../models/doctor.model.js";
import Service from "../models/services.model.js";
import {  
  bookAppoinmentService,
  bookServicesService,
  editPatientDetailsService,
  getPatientDetailsService,
  getUserAppoinmentsService,
  getUserServicesService,
} from "../services/patient.services.js";

export const getPatientDetailsController = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const patient = await getPatientDetailsService(patientId);
    return res.status(200).json({ success: true, data: patient });
  } catch (err) {
    next(err);
  }
};

export const editPatientDetailsController = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const obj = req.body;
    const patient = await editPatientDetailsService(patientId, obj);
    return res
      .status(200)
      .json({ success: true, message: "update successful" });
  } catch (err) {
    next(err);
  }
};

export const getUserAppoinmentsController = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const appoinments = await getUserAppoinmentsService(patientId);
    res.status(200).json({ success: true, data: appoinments });
  } catch (err) {
    next(err);
  }
};

// export const bookAppoinmentController = async (req, res) => {
//   try {
//     const patientId = req.user.id;
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Internal Service Error" });
//   }
// }; //  get it from admin since patient only needs to book/add appoinments
export const bookAppoinmentController = async (req, res, next) => {
  //? do reaserch about web hook events
  try {
    const patientId = req.user.id;
    const { doctorId } = req.params;
    const { timeSlot, reason, paymentMethod } = req.body;

    const bookedAppoinment = await bookAppoinmentService(
      patientId,
      doctorId,
      timeSlot,
      reason,
      paymentMethod,
    );

    return res.status(201).json({
      success: true,
      message: "appoinment added",
      id: bookedAppoinment.id,
      url: bookedAppoinment.url,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserServicesController = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const services = await getUserServicesService(patientId);
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
};

export const bookServicesController = async (req, res, next) => {
  try {
    const patient = req.user.id;
    const { serviceId } = req.params;
    const { timeSlot, status } = req.body;
    const serviceBooked = await bookServicesService(
      patient,
      serviceId,
      timeSlot,
      status,
    );
    res.status(200).json({
      success: true,
      message: "service booked",
      id: serviceBooked._id,
    });
  } catch (err) {
    next(err);
  }
};
