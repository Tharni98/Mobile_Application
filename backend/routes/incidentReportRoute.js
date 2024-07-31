import express from 'express';
import { IncidentReport } from '../models/incidentReport.js';

const incidentReportRouter = express.Router();

incidentReportRouter.post('/', async (req, res) => {
    const incidentReport = new IncidentReport(req.body);

    try {
        const newIncidentReport = await IncidentReport.create(incidentReport);
        return res.status(201).json(newIncidentReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default incidentReportRouter;