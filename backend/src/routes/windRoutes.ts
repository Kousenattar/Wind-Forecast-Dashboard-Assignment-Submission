import { Router } from "express";
import { actualWindSolar, windDashboard, windForecast } from "../controller/windController";



const router = Router();

router.get("/forecast", windForecast);

router.get("/actual", actualWindSolar);

router.get("/dashboard", windDashboard);

export default router;