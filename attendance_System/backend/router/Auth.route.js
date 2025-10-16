import express from "express";
// import { Router } from "express";
import {
  AdminLogin,
  AdminRegister,
  AuthRegister,
  TeacherLogin,
} from "../controllers/AuthController.js";
import { uploaded } from "../utils/multer.js";

const router = express.Router();

router.post("/register", AuthRegister);
router.post("/register/admin", AdminRegister);
router.post("/teacher/login", TeacherLogin);
router.post("/admin/login", AdminLogin);

export default router;
