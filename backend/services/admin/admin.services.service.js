import ServiceBooking from "../../models/serviceBooking.model.js";
import Service from "../../models/services.model.js";
import CustomError from "../../utls/customError.js";

export const getallservicesService = async () => {
  // const services = await Service.find().lean();
  // const bookings = await ServiceBooking.find().lean();

  // const updatedServices = services.map((service) => {
  //   const serviceBookings = bookings.filter(
  //     (b) => b.service.toString() === service._id.toString(),
  //   );

  //   const completedBookings = serviceBookings.filter(
  //     (b) => b.status === "completed",
  //   );

  //   const cancelledBookings = serviceBookings.filter(
  //     (b) => b.status === "cancelled" || b.adminCancel === true,
  //   );

  //   const revenue = completedBookings.reduce((acc, b) => {
  //     return acc + b.fee;
  //   }, 0);

  //   return {
  //     ...service,
  //     totalBookings: serviceBookings.length,
  //     completedBookings: completedBookings.length,
  //     cancelledBookings: cancelledBookings.length,
  //     revenue,
  //   };
  // });
  const [services, bookings] = await Promise.all([
    Service.find().lean(),
    ServiceBooking.find().lean(),
  ]);

  const updatedServices = services.map((service) => {
    let totalBookings = 0;
    let completedBookings = 0;
    let cancelledBookings = 0;
    let revenue = 0;

    for (const booking of bookings) {
      if (booking.service.toString() !== service._id.toString()) continue;

      totalBookings++;

      if (booking.status === "completed") {
        completedBookings++;
        revenue += booking.fee;
      }

      if (booking.status === "cancelled" || booking.adminCancel === true) {
        cancelledBookings++;
      }
    }

    return {
      ...service,
      totalBookings,
      completedBookings,
      cancelledBookings,
      revenue,
    };
  });

  return updatedServices;
};
export const addservicesService = async (
  image,
  price,
  name,
  availability,
  about,
  instructions,
  scheduleSlots,
) => {
  if (!image || !price || !name || !about || !instructions || !scheduleSlots) {
    throw new CustomError("all fields are mandatory", 400);
  }
  const service = await Service.create({
    image,
    price,
    name,
    availability,
    about,
    instructions,
    scheduleSlots,
  });
  return service;
};
export const deleteservicesService = async (serviceId) => {
  const deletedService = await Service.findByIdAndDelete(serviceId);
  if (!deletedService) {
    throw new CustomError("sercie not found", 404);
  }
};
export const editservicesService = async (serviceId, data) => {
  const service = await Service.findByIdAndUpdate(serviceId, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!service) {
    throw new CustomError("service not found", 404);
  }
};
export const getUserservicesService = async () => {
  const userServices = await ServiceBooking.find()
    .lean()
    .populate("patient", "name gender phone")
    .populate("service", "name");
  return userServices;
};
export const adminCancelUserservicesService = async (userServiceId) => {
  const userService = await ServiceBooking.findOneAndUpdate(
    { _id: userServiceId, status: "pending" },
    { adminCancel: true, status: "cancelled" },
    { returnDocument: "after", runValidators: true },
  );
  if (!userService) {
    throw new CustomError("service not found or already taken", 400);
  }
};

export const adminServicesDashboardService = async () => {
  const services = await ServiceBooking.find().lean().select("status fee");
  const totalServices = services.length;
  let totalRevenue = 0;
  let completedServices = 0;
  let cancelledServices = 0;
  for (let service of services) {
    if (service.status == "completed") {
      completedServices++;
      totalRevenue += service.fee;
    } else if (service.status == "cancelled") {
      cancelledServices++;
    }
  }
  // const totalRevenue = services.reduce((acc, item) => {
  //   return item.status === "completed" ? acc + item.fee : acc;
  // }, 0);
  // const completedServices = services.filter(
  //   (service) => service.status === "completed",
  // ).length;
  // const cancelledServices = services.filter(
  //   (service) => service.status === "cancelled",
  // ).length;

  return { totalRevenue, totalServices, completedServices, cancelledServices };
};
