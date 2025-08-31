import express from "express";
import { connectWallet } from "../controllers/userController.js";

const router = express.Router();
router.post("/connect", connectWallet);
export default router;
