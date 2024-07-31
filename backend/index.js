import express from "express";
import mongoose from "mongoose";
import profileRouter from "./routes/profileRoute.js";
import incidentReportRouter from "./routes/incidentReportRoute.js";
import cors from "cors";

const PORT = 3000;
const DB_URL =
  "mongodb+srv://nehanshanuka:app_incident_report@cluster0.rntltvf.mongodb.net/INCIDENT_REPORT_APP?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/profile", profileRouter);

app.use("/report", incidentReportRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
