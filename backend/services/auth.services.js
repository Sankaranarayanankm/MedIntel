import Patient from "../models/patient.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import CustomError from "../utls/customError.js";
import Doctor from "../models/doctor.model.js";
import Admin from "../models/admin.model.js";

dotenv.config({ path: "./backend/.env" });

export const patientSignupService = async (
  name,
  password,
  phone,
  email,
  gender,
) => {
  if (!name || !password || !phone || !email || !gender) {
    throw new CustomError("all fields are mandatory", 400);
  }

  const existingUser = await Patient.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new CustomError("user already exists", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const patientUser = await Patient.create({
    name,
    phone,
    gender,
    email: email.toLowerCase(),
    password: hashPassword,
  });

  const token = jwt.sign(
    { id: patientUser._id, role: patientUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const obj = { token, id: patientUser._id, role: patientUser.role };
  return obj;
};
export const patientLoginService = async (email, password) => {
  if (!password || !email) {
    throw new CustomError("all fields are mandatory", 400);
  }

  const user = await Patient.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("user not found", 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("invalid credentials", 400);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const obj = { token, id: user._id, role: user.role };
  return obj;
};
export const doctorLoginService = async (doctorEmail, password) => {
  if (!doctorEmail || !password) {
    throw new CustomError("all fields are mandatory", 400);
  }
  const doctor = await Doctor.findOne({
    doctorEmail: doctorEmail.toLowerCase(),
  }).select("+password");
  if (!doctor) {
    throw new CustomError("doctor not found", 404);
  }
  console.log(doctor);
  const passwordMatch = await bcrypt.compare(password, doctor.password);
  if (!passwordMatch) {
    throw new CustomError("invalid credentials", 400);
  }
  // generate token
  const token = jwt.sign(
    { id: doctor._id, role: doctor.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const obj = { token, id: doctor._id, role: doctor.role };
  return obj;
};
export const adminSignupService = async (name, password, email) => {
  if (!name || !password || !email) {
    throw new CustomError("all fields are mandatory", 400);
  }
  const existingEmail = await Admin.findOne({ email });
  if (existingEmail) {
    throw new CustomError("User already exists", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const adminUser = await Admin.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  //generate tokens

  const token = jwt.sign(
    { id: adminUser._id, role: adminUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  const obj = { token, id: adminUser._id, role: adminUser.role };
  return obj;
};
export const adminLoginService = async (email, password) => {
  if (!email || !password) {
    throw new CustomError("All fields are mandatory", 400);
  }
  const existingUser = await Admin.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new CustomError("User doesnot exist", 404);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new CustomError("check your credentials", 401);
  }
  // create token
  const token = jwt.sign(
    { id: existingUser._id, role: existingUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const obj = { token, id: existingUser._id, role: existingUser.role };
  return obj;
};
