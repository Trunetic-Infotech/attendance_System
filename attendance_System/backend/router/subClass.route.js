import express from "express";
import { createSubClass } from "../controllers/SubClassController.js";

const router = express.Router();

router.post("/createSubClass", createSubClass);

export default router;
