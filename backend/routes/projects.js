const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const { auth, checkRole } = require('../middleware/auth');
const router = express.Router();

// Create Project (Admin only)
router.post('/', auth, checkRole(['Admin']), async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = new Project({
      name,
      description,
      owner: req.user.id,
      members: members || []
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'Admin') {
      query = {
        $or: [{ owner: req.user.id }, { members: req.user.id }]
      };
    }
    const projects = await Project.find(query).populate('owner members', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Project (Admin only)
router.delete('/:id', auth, checkRole(['Admin']), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Cascading delete tasks
    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Project and associated tasks deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
