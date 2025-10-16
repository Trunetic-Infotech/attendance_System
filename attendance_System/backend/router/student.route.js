import express from "express";
import { AddStudent } from "../controllers/AddStudentController.js";
import { uploaded } from "../utils/multer.js";

const router = express.Router();

router.post("/AddStudent", uploaded.single("profileImage"), AddStudent);

export default router;
