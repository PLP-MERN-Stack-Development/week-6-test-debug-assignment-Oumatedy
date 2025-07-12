const express = require('express');
const router = express.Router();
const {
  getAllBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  updateBugStatus
} = require('../controllers/bugController');

// GET /api/bugs - Get all bugs
router.get('/', getAllBugs);

// GET /api/bugs/:id - Get single bug
router.get('/:id', getBugById);

// POST /api/bugs - Create new bug
router.post('/', createBug);

// PUT /api/bugs/:id - Update bug
router.put('/:id', updateBug);

// PATCH /api/bugs/:id/status - Update bug status only
router.patch('/:id/status', updateBugStatus);

// DELETE /api/bugs/:id - Delete bug
router.delete('/:id', deleteBug);

module.exports = router;