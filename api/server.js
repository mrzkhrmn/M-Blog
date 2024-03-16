import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(9000, () => {
  console.log("Server is listening on port 9000");
});
