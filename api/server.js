import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(9000, () => {
  console.log("Server is listening on port 9000");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
