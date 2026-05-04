const express = require('express');
const Task = require('../models/Task');
const Activity = require('../models/Activity');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, project, dueDate } = req.body;
    const task = new Task({ title, description, status, priority, assignedTo, project, dueDate });
    await task.save();

    // Log activity
    const activity = new Activity({
      action: 'created task',
      user: req.user.id,
      details: `"${title}"`,
      targetId: task._id
    });
    await activity.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all tasks assigned to current user
router.get('/my-tasks', auth, async (req, res) => {
  try {
    console.log('Fetching tasks for user ID:', req.user.id);
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('project', 'name')
      .populate('assignedTo', 'name email');
    console.log(`Found ${tasks.length} tasks for user ${req.user.id}`);
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching my-tasks:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks visible to the user (all for Admin, only own for Member)
router.get('/visible', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'Admin') {
      query = { assignedTo: req.user.id };
    }
    const tasks = await Task.find(query)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tasks for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    let query = { project: req.params.projectId };
    if (req.user.role !== 'Admin') {
      query.assignedTo = req.user.id;
    }
    const tasks = await Task.find(query).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Log activity if status changed
    if (req.body.status) {
      const activity = new Activity({
        action: `updated task status to ${req.body.status}`,
        user: req.user.id,
        details: `"${task.title}"`,
        targetId: task._id
      });
      await activity.save();
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    if (req.user.role !== 'Admin' && task.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
