const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Create task
router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get tasks
router.get("/", auth, async (req, res) => {
  try {
    const { projectId } = req.query;

    let filter = {};

    if (projectId) {
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update status
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

module.exports = router;