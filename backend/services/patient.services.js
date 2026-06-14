import Appoinment from "../models/appoinments.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import ServiceBooking from "../models/serviceBooking.model.js";
import CustomError from "../utls/customError.js";
import { paymentService } from "./payment.service.js";

export const getPatientDetailsService = async (patientId) => {
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new CustomError("patient not found", 404);
  }
  return patient;
};

export const editPatientDetailsService = async (patientId, obj) => {
  const patient = await Patient.findByIdAndUpdate(patientId, obj, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!patient) {
    throw new CustomError("patient not found", 404);
  }
  return patient;
};
export const getUserAppoinmentsService = async (patientId) => {
  const appoinments = await Appoinment.find({ patient: patientId }).populate(
    "doctor",
    "name qualification image",
  );
  return appoinments;
};

export const bookAppoinmentService = async (
  patientId,
  doctorId,
  timeSlot,
  reason,
  paymentMethod,
) => {
  if (!timeSlot || !paymentMethod || !reason) {
    throw new CustomError("all fields are mandatory", 400);
  }
  // finding doctor
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new CustomError("doctor not found", 404);
  }
  const fee = doctor.fee;
  //checking existing appoinment
  // const existingAppoinment = await Appoinment.findOne({
  //   doctor: doctorId,
  //   timeSlot,
  // });
  // if (existingAppoinment) {
  //   throw new CustomError("you have already booked at this time slot", 400);
  // }
  const appoinment = await Appoinment.create({
    patient: patientId,
    doctor: doctorId,
    timeSlot,
    reason,
    paymentMethod,
    fee,
  });
  //payment
  let url = "";
  if (paymentMethod == "online") {
    const session = await paymentService(doctor.name, fee, appoinment._id);
    url = session.url;
  }
  return { url, id: appoinment._id };
};

export const getUserServicesService = async (patientId) => {
  const services = await ServiceBooking.find({ patient: patientId }).populate(
    "service",
    "image name",
  );
  return services;
};

export const bookServicesService = async (
  patient,
  serviceId,
  timeSlot,
  status,
) => {
  if (!timeSlot) {
    throw new CustomError("enter time slot", 400);
  }
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new CustomError("service not found", 404);
  }
  const existingService = await ServiceBooking.findOne({
    service: serviceId,
    timeSlot,
  });
  if (existingService) {
    throw new CustomError("you have already booked service", 400);
  }

  const serviceBooked = await ServiceBooking.create({
    patient,
    service: serviceId,
    timeSlot,
    status,
  });
  return serviceBooked;
};
