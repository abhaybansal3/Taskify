const express = require('express');
const Activity = require('../models/Activity');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get recent activities
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an activity (internal use mostly, but good to have)
router.post('/', auth, async (req, res) => {
  try {
    const { action, details, targetId } = req.body;
    const activity = new Activity({ action, user: req.user.id, details, targetId });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
