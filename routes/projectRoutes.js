const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  createProject, 
  getProjectById, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Import the nested task router
const taskRouter = require('./taskRoutes.js');

// Apply the 'protect' middleware to all routes defined in this file
router.use(protect);

// Re-route any request that matches '/:projectId/tasks' to the task router
router.use('/:projectId/tasks', taskRouter);

// Routes for getting all projects and creating a new one
router.route('/').get(getProjects).post(createProject);

// Routes for getting, updating, and deleting a single project by its ID
router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;