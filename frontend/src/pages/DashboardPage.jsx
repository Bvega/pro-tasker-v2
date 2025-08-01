import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import Modal from '../components/Modal';
import './Dashboard.css';
import './Form.css';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for Create Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // ** NEW STATE FOR EDIT MODAL **
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');


  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.createProject({ name, description });
      setName('');
      setDescription('');
      setIsCreateModalOpen(false);
      fetchProjects();
    } catch (err) { console.error('Failed to create project', err); }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This will also delete all its tasks.')) {
      try {
        await projectService.deleteProject(projectId);
        fetchProjects();
      } catch (err) { console.error('Failed to delete project', err); }
    }
  };

  // ** NEW FUNCTIONS FOR EDITING **
  const openEditModal = (project) => {
    setCurrentProject(project);
    setEditName(project.name);
    setEditDescription(project.description);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.updateProject(currentProject._id, {
        name: editName,
        description: editDescription,
      });
      setIsEditModalOpen(false);
      setCurrentProject(null);
      fetchProjects(); // Refresh project list
    } catch (err) { console.error('Failed to update project', err); }
  };


  if (loading) return <div className="container"><h2>Loading projects...</h2></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>My Projects</h1>
        <button className="create-btn" onClick={() => setIsCreateModalOpen(true)}>
          + Create Project
        </button>
      </div>

      {/* Create Project Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <form onSubmit={handleCreateProject}>
          <h2>Create New Project</h2>
          <div className="form-group"><label htmlFor="projectName">Project Name</label><input type="text" id="projectName" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-group"><label htmlFor="projectDescription">Description</label><textarea id="projectDescription" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea></div>
          <button type="submit" className="submit-btn">Create Project</button>
        </form>
      </Modal>

      {/* ** NEW EDIT PROJECT MODAL ** */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleUpdateProject}>
          <h2>Edit Project</h2>
          <div className="form-group"><label htmlFor="editProjectName">Project Name</label><input type="text" id="editProjectName" value={editName} onChange={(e) => setEditName(e.target.value)} required /></div>
          <div className="form-group"><label htmlFor="editProjectDescription">Description</label><textarea id="editProjectDescription" rows="4" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea></div>
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </Modal>

      {projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project._id} className="project-card-container">
              <Link to={`/projects/${project._id}`} className="project-card-link">
                <div className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </Link>
              <div className="project-card-actions">
                <button onClick={() => openEditModal(project)} className="project-edit-btn">Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project._id);}} className="project-delete-btn">&times;</button>
              </div>
            </div>
          ))}
        </div>
      ) : (<p>You haven't created any projects yet.</p>)}
    </div>
  );
};

export default DashboardPage;