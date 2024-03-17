import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(9000, () => {
  console.log("Server is listening on port 9000");
});

app.use("/api/auth", authRouter);
