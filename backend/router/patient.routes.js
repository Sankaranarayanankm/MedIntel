import express from "express";
import {
  bookAppoinmentController,
  bookServicesController,
  editPatientDetailsController,
  getPatientDetailsController,  
  getUserAppoinmentsController,
  getUserServicesController,
} from "../controller/patient.controller.js";
import { protectRoute, roleMiddleware } from "../middleware/auth.middleware.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

const router = express.Router();
   
router.use(protectRoute);
router.use(roleMiddleware("patient"));

router.get("/", getPatientDetailsController);
router.put("/", editPatientDetailsController);

router.post("/book-appoinment/:doctorId", bookAppoinmentController);
router.get("/appoinments", getUserAppoinmentsController);
// router.put("/book-appoinment", bookAppoinmentController);

router.post("/services/:serviceId", bookServicesController);
router.get("/services", getUserServicesController);

router.use(errorMiddleware);

export default router;
