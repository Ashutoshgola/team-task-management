import express from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";
const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.post("/", protect, authorizeRole("ADMIN"), createProject);
export default router;