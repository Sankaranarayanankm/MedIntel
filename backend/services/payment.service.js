import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const paymentService = async (name, fee, appoinmentId) => {
  const session = await stripe.checkout.sessions.create({
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
    success_url: "http://localhost:5173/patient/appointments",
    cancel_url: "http://localhost:5173/patient/doctors",
  });
  return session;
};
