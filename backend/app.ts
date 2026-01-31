import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import DataBaseConnection from "./config/DataBaseConnection";
import UserRoute from "./routes/UserRoutes";

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

//My routes
app.use("/user", UserRoute);

//running the server
const Port = process.env.PORT || "your default port";
app.listen(Port, () => console.log(`server is running on port ${Port}`));
