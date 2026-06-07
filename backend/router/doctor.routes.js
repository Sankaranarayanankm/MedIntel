import express from "express";
import {
  editDoctorDetailsController,
  getAllDoctorAppoinmentsController,
  getDoctorDetailsController,
  updateDoctorAppoinmentsController,
} from "../controller/doctor.controller.js";
import { protectRoute, roleMiddleware } from "../middleware/auth.middleware.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

const router = express.Router();
router.use(protectRoute);
router.use(roleMiddleware("doctor"));
   
router.get("/appoinments", getAllDoctorAppoinmentsController);
router.put("/appoinments/:appoinmentId", updateDoctorAppoinmentsController);

router.get("/", getDoctorDetailsController);
router.put("/", editDoctorDetailsController);

router.use(errorMiddleware);

export default router;
