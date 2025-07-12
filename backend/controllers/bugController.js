const Bug = require('../models/Bug');
const { validateBugData } = require('../utils/validation');

/**
 * Get all bugs
 */
const getAllBugs = async (req, res, next) => {
  try {
    console.log('Fetching all bugs...');
    const bugs = await Bug.find().sort({ createdAt: -1 });
    console.log(`Found ${bugs.length} bugs`);
    
    res.status(200).json({
      success: true,
      count: bugs.length,
      data: bugs
    });
  } catch (error) {
    console.error('Error fetching bugs:', error);
    next(error);
  }
};

/**
 * Get single bug by ID
 */
const getBugById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Fetching bug with ID: ${id}`);
    
    const bug = await Bug.findById(id);
    
    if (!bug) {
      console.log(`Bug with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    console.log(`Found bug: ${bug.title}`);
    res.status(200).json({
      success: true,
      data: bug
    });
  } catch (error) {
    console.error('Error fetching bug:', error);
    next(error);
  }
};

/**
 * Create new bug
 */
const createBug = async (req, res, next) => {
  try {
    console.log('Creating new bug with data:', req.body);
    
    // Validate bug data
    const validation = validateBugData(req.body);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    // Create bug
    const bug = new Bug(validation.data);
    await bug.save();
    
    console.log(`Bug created successfully: ${bug.title}`);
    res.status(201).json({
      success: true,
      data: bug
    });
  } catch (error) {
    console.error('Error creating bug:', error);
    next(error);
  }
};

/**
 * Update bug
 */
const updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Updating bug with ID: ${id}`);
    console.log('Update data:', req.body);
    
    // Check if bug exists
    const existingBug = await Bug.findById(id);
    if (!existingBug) {
      console.log(`Bug with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    // Validate update data
    const validation = validateBugData(req.body);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    // Update bug
    const updatedBug = await Bug.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );
    
    console.log(`Bug updated successfully: ${updatedBug.title}`);
    res.status(200).json({
      success: true,
      data: updatedBug
    });
  } catch (error) {
    console.error('Error updating bug:', error);
    next(error);
  }
};

/**
 * Delete bug
 */
const deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Deleting bug with ID: ${id}`);
    
    const bug = await Bug.findByIdAndDelete(id);
    
    if (!bug) {
      console.log(`Bug with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    console.log(`Bug deleted successfully: ${bug.title}`);
    res.status(200).json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting bug:', error);
    next(error);
  }
};

/**
 * Update bug status only
 */
const updateBugStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log(`Updating bug status - ID: ${id}, Status: ${status}`);
    
    // Check if bug exists
    const existingBug = await Bug.findById(id);
    if (!existingBug) {
      console.log(`Bug with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    // Validate status
    const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      console.log(`Invalid status: ${status}`);
      return res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Update status
    const updatedBug = await Bug.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    console.log(`Bug status updated successfully: ${updatedBug.title} -> ${status}`);
    res.status(200).json({
      success: true,
      data: updatedBug
    });
  } catch (error) {
    console.error('Error updating bug status:', error);
    next(error);
  }
};

module.exports = {
  getAllBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  updateBugStatus
};