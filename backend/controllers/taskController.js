const Task = require('../models/taskModel.js');
const Project = require('../models/projectModel.js');

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project || project.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const task = new Task({ project: projectId, title, description, status });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project || project.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const tasks = await Task.find({ project: projectId });
  res.json(tasks);
};

const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (task) {
        task.title = title || task.title;
        task.description = description === undefined ? task.description : description;
        task.status = status || task.status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    if (task) {
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { createTask, getTasksByProject, updateTask, deleteTask };