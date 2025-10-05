import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./src/user/user.route.js";
import taskRouter from "./src/Task/task.route.js";

dotenv.config({quiet:true});
const app = express();


app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true               // allow cookies with requests
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(4000, () => console.log("Server running on port 4000"));
