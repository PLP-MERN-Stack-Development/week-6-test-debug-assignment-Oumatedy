const Bug = require('../models/Bug');
const { validateBugInput } = require('../utils/validation');

// Create Bug
exports.createBug = async (req, res, next) => {
  const { errors, isValid } = validateBugInput(req.body);
  if (!isValid) return res.status(400).json({ errors });

  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

// Get All Bugs
exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

// Update Bug
exports.updateBug = async (req, res, next) => {
  const { errors, isValid } = validateBugInput(req.body);
  if (!isValid) return res.status(400).json({ errors });

  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// Delete Bug
exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
};
