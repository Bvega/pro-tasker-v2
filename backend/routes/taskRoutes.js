const express = require('express');
// 'mergeParams: true' allows us to access parameters from the parent router (e.g., :projectId)
const router = express.Router({ mergeParams: true }); 

const { 
    createTask, 
    getTasksByProject,
    updateTask,
    deleteTask
} = require('../controllers/taskController.js');

// Maps to /api/projects/:projectId/tasks
router.route('/').post(createTask).get(getTasksByProject);

// Maps to /api/projects/:projectId/tasks/:taskId
router.route('/:taskId').put(updateTask).delete(deleteTask);

module.exports = router;