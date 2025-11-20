import express from "express";
import {
  getMyNotifications,
  markAsRead,
  markAllRead
} from "../controllers/notificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", authMiddleware, getMyNotifications);
router.put("/read/:id", authMiddleware, markAsRead);
router.put("/read-all", authMiddleware, markAllRead);

export default router;
