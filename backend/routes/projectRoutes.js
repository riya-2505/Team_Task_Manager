const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const Project = require("../models/Project");

// Create project (admin)
router.post("/", auth, isAdmin, async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id,
    members: [req.user.id] 
  });
  res.json(project);
});

// Get projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find({
    members: req.user.id
  });
  res.json(projects);
});

module.exports = router;