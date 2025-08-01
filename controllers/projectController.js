const Project = require('../models/projectModel.js');

// @desc    Get logged in user's projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  // Find projects that belong to the logged-in user
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const project = new Project({
    name,
    description,
    user: req.user._id, // Assign the logged-in user as the owner
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // **Authorization Check:** Ensure the project belongs to the logged-in user
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.findById(req.params.id);

  if (project) {
    // **Authorization Check:**
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // **Authorization Check:**
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};

module.exports = { getProjects, createProject, getProjectById, updateProject, deleteProject };