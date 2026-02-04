import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import DataBaseConnection from "./config/DataBaseConnection";
import UserRoute from "./routes/UserRoutes";
import ProblemRoute from "./routes/ProblemRoutes";

dotenv.config();
DataBaseConnection();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

//My routes
app.use("/user", UserRoute);
app.use("/problem", ProblemRoute);

//running the server
const Port = process.env.PORT || "5000";
app.listen(Port, () => console.log(`server is running on port ${Port}`));
