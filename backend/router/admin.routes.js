import express from "express";
import { protectRoute, roleMiddleware } from "../middleware/auth.middleware.js";
import {
  addDoctorsController,
  deleteDoctorController,
  getAllDoctorsController,adminDashboardController
} from "../controller/admin/admin.doctor.controller.js";
import {
  adminCancelAppoinmentsController,
  deleteAppoinmentsController,
  getAppoinmentsController,
} from "../controller/admin/admin.appointments.controller.js";
import {
  addServicesController,
  adminCancelUserServiceController,
  deleteServicesController,
  editServicesController,
  getAllServicesController,
  getUserServices,adminServicesDashboardController
} from "../controller/admin/admin.services.controller.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

const router = express.Router();
router.use(protectRoute);
router.use(roleMiddleware("admin"));

router.get("/doctors", getAllDoctorsController);
router.post("/doctors", addDoctorsController);

router.delete("/doctors/:doctorId", deleteDoctorController);

router.get("/appoinments", getAppoinmentsController);
router.put(
  "/appoinments/admin-cancel/:appoinmentId",
  adminCancelAppoinmentsController,
);
router.delete("/appoinments/:appoinmentId", deleteAppoinmentsController);

router.get("/services", getAllServicesController);
router.post("/services", addServicesController);
router.delete("/services/:serviceId", deleteServicesController);
router.put("/services/:serviceId", editServicesController);

router.get("/user-services/", getUserServices);
router.put(
  "/user-services/admin-cancel/:userServiceId",
  adminCancelUserServiceController,
);

// gettting total number of users and services
router.get("/dashboard", adminDashboardController);
router.get("/dashboard/services", adminServicesDashboardController);

router.use(errorMiddleware);

export default router;
