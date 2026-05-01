import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", protect, createTask);
router.post("/", protect, authorizeRole("ADMIN"), createTask);
router.patch("/:id", protect, authorizeRole("ADMIN"), updateTaskStatus);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTaskStatus);

export default router;