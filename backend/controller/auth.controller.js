import {
  adminLoginService,
  adminSignupService,
  doctorLoginService,
  patientLoginService,
  patientSignupService,
} from "../services/auth.services.js";

export const patientSignupController = async (req, res, next) => {
  try {
    const { name, password, phone, email, gender } = req.body;
    const patientUser = await patientSignupService(
      name,
      password,  
      phone,
      email,
      gender,
    );

    return res.status(201).json({
      success: true,
      message: "Successfully created account",
      token: patientUser.token,
      id: patientUser.id,
    });
  } catch (err) {
    next(err);
  }
};

export const patientLoginController = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await patientLoginService(email, password);
    return res.status(200).json({
      success: true,
      message: "successfully logged in ",
      token: user.token,
      id: user.id,
    });
  } catch (err) {
    next(err);
  }
};

export const doctorLoginController = async (req, res, next) => {
  try {
    const { doctorEmail, password } = req.body;
    const doctor = await doctorLoginService(doctorEmail, password);
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      token: doctor.token,
      id: doctor._id,
    });
  } catch (err) {
    next(err);
  }
};

export const adminSignupcontroller = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const adminUser = await adminSignupService(name, password, email);
    return res.status(200).json({
      success: true,
      token: adminUser.token,
      message: "admin user created",
      id: adminUser.id,
    });
  } catch (err) {
    next(err);
  }
};

export const adminLogincontroller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await adminLoginService(email, password);
    return res.status(200).json({
      success: true,
      token: existingUser.token,
      message: "login successful",
      id: existingUser.id,
    });
  } catch (err) {
    next(err);
  }
};
