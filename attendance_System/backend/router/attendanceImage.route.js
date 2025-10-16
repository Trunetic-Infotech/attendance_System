import express from "express";
import { AttendanceImage } from "../controllers/AttendanceImageController.js";
import { uploaded } from "../utils/multer.js";

const router = express.Router();

router.post("/attendanceImage", uploaded.single("image"), AttendanceImage);

export default router;
