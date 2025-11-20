import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  addMember,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE PROJECT (supports optional image upload)
router.post("/create", authMiddleware, upload.single("file"), createProject);

// UPDATE PROJECT (supports optional new image upload)
router.put("/update/:id", authMiddleware, upload.single("file"), updateProject);

// DELETE PROJECT
router.delete("/delete/:id", authMiddleware, deleteProject);

// GET ALL PROJECTS
router.get("/all", authMiddleware, getAllProjects);

// GET PROJECT DETAILS
router.get("/:id", authMiddleware, getProjectById);

// ADD TEAM MEMBER
router.put("/add-member/:id", authMiddleware, addMember);

export default router;
