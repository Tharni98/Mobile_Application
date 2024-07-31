import mongoose from "mongoose";

const incidentReportSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: false,
    },
    propertyAddress: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

export const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);