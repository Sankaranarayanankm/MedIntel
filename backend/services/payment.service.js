import Stripe from "stripe";

export const paymentService = async (name, fee, appoinmentId) => {
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Appointment with Dr.${name}`,
          },
          unit_amount: fee * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      appoinmentId: appoinmentId.toString(),
    },
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  return session;
};
