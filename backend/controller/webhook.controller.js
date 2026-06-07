
import dotenv from "dotenv";
import CustomError from "../utls/customError.js";
import Stripe from "stripe";
import Appoinment from "../models/appoinments.model.js";

dotenv.config({ path: "./backend/.env" });

export const stripeWebhookController = async (req, res, next) => {
  let event = req.body;

  try {
    const signature = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const appoinmentId = session.metadata.appoinmentId;

        await Appoinment.findByIdAndUpdate(appoinmentId, {
          paymentStatus: "confirmed",
        });

        console.log("payment successful");

        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object;

        const appoinmentId = session.metadata.appoinmentId;

        await Appoinment.findByIdAndDelete(appoinmentId);

        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({
      received: true,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
    // res.sendStatus(400);
  }
};
