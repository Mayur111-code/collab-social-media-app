import Project from "../model/Project.js";
import CollabRequest from "../model/CollabRequest.js";

// CREATE PROJECT (Cloudinary supported)
export const createProject = async (req, res) => {
  try {
    const { title, description, tags, postId } = req.body;

    const bannerUrl = req.file ? req.file.path : null;

    const project = await Project.create({
      owner: req.user.id,
      title,
      description,
      tags,
      image: bannerUrl,
      postId,
      team: [req.user.id]
    });

    return res.json({ message: "Project created", project });

  } catch (err) {
    console.error("Error creating project:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name avatar")
      .populate("team", "name avatar skills")
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {
    console.error("Error getting projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET PROJECT DETAILS
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name avatar")
      .populate("team", "name avatar skills");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (err) {
    console.error("Error getting project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROJECT (Cloudinary supported)
export const updateProject = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Check owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const bannerUrl = req.file ? req.file.path : project.image;

    project.title = title || project.title;
    project.description = description || project.description;
    project.tags = tags || project.tags;
    project.image = bannerUrl;

    await project.save();

    return res.json({ message: "Project updated", project });

  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Check owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });

  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD MEMBER TO PROJECT
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Only project owner can add members
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!project.team.includes(userId)) {
      project.team.push(userId);
    }

    await project.save();

    res.json({ message: "Team member added", project });

  } catch (err) {
    console.error("Error adding member:", err);
    res.status(500).json({ message: "Server error" });
  }
};
