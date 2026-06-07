import express from "express";
import {
  adminLogincontroller,
  adminSignupcontroller,
  doctorLoginController,
  patientLoginController,
  patientSignupController,
} from "../../controller/auth.controller.js";
import { errorMiddleware } from "../../middleware/error.middleware.js";

const router = express.Router();

// admin   
router.post("/admin-login", adminLogincontroller);
router.post("/admin-signup", adminSignupcontroller);
// doctor
router.post("/doctor-login", doctorLoginController);
// patient
router.post("/patient-login", patientLoginController);
router.post("/patient-signup", patientSignupController);

router.use(errorMiddleware);

export default router;
