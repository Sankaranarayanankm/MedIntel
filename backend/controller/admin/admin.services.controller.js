import {
  addservicesService,
  adminCancelUserservicesService,
  deleteservicesService,
  editservicesService,
  getallservicesService,
  getUserservicesService,
} from "../../services/admin/admin.services.service.js";

export const getAllServicesController = async (req, res, next) => {
  try {
    const services = await getallservicesService();

    return res.status(200).json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
};

export const addServicesController = async (req, res, next) => {
  try {
    const {
      image,
      price,
      name,
      availability,
      about,
      instructions,
      scheduleSlots,
    } = req.body;
    const service = await addservicesService(
      image,
      price,
      name,
      about,
      instructions,
      scheduleSlots,
    );
    return res.status(201).json({
      success: true,
      message: "service created successfully",
      id: service._id,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteServicesController = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    await deleteservicesService(serviceId);
    res.status(200).json({ success: true, message: "service deleted" });
  } catch (err) {
    next(err);
  }
};

export const editServicesController = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const data = req.body;
    await editservicesService(serviceId, data);
    res.status(200).json({ success: true, message: "service updated" });
  } catch (err) {
    next(err);
  }
};

export const getUserServices = async (req, res, next) => {
  try {
    const userServices = await getUserservicesService();
    res.status(200).json({ success: true, data: userServices });
  } catch (err) {
    next(err);
  }
};

export const adminCancelUserServiceController = async (req, res, next) => {
  try {
    const { userServiceId } = req.params;
    await adminCancelUserservicesService(userServiceId);
    res.status(200).json({ success: true, message: "admin cancelled service" });
  } catch (err) {
    next(err);
  }
};

export const adminServicesDashboardController = async (req, res, next) => {
  try {
    const serviceDetails = await adminServicesDashboardService();
    res.status(200).json({ success: true, data: serviceDetails });
  } catch (error) {
    next(error);
  }
};
