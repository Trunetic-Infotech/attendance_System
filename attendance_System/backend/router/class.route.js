import express from "express";
import { AddClass } from "../controllers/ClassController.js";

const router = express.Router();

router.post("/createClass", AddClass);

export default router;
