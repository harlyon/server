import express from "express";
import { enrollCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/enroll", enrollCourse);

export default router;
