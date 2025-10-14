import express from "express";
// import { Router } from "express";
import {
  AdminRegister,
  AuthRegister,
  TeacherLogin,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", AuthRegister);
router.post("/register/admin", AdminRegister);
router.post("/teacher/login", TeacherLogin);

export default router;
