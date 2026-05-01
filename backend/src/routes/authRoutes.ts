import express from "express";
import {signup, login} from "../controllers/authController";
import { getOverdueTasks } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";



const router = express.Router();

router.post("/signup", (req, res, next) => {

  console.log("Signup route hit");

  next();

}, signup);

router.post("/login", login);

router.get("/overdue", protect, getOverdueTasks);
export default router;