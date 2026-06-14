import express from "express";
import patientRouter from "./router/patient.routes.js";
import adminRouter from "./router/admin.routes.js";
import doctorRouter from "./router/doctor.routes.js";
import authRouter from "./router/auth/auth.routes.js";
import rateLimit from "express-rate-limit";
import { connect } from "./db/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// const limiter = rateLimit({
//   max: 20, // sets max req per window
//   windowMs: 60 * 60 * 1000, // setting the time for 1 hour,its in ms
//   message: {
//     success: false,
//     message: "recived too many requests from this IP,please try after one hour",
//   },
// });
// app.use("/api/v1", limiter); // applying rate limit on all endpoint starts with /api/v1

app.use(express.json({ limit: "50mb" }));
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
