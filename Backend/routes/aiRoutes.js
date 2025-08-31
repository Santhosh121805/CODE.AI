import express from "express";
import { runWorkflow } from "../controllers/aiController.js";

const router = express.Router();
router.post("/run", runWorkflow);
export default router;
