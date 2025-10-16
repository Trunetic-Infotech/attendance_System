import express from "express";
import { UploadImage } from "../controllers/UploadImageController.js";
import { uploaded } from "../utils/multer";

const router = express.Router();

router.post("/uploadImage", uploaded.single("profileImage"), UploadImage);

export default router;
