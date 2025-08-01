import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import projectService from '../services/projectService';
import Modal from '../components/Modal';
import './Dashboard.css';
import './Form.css';

const DashboardPage = () => {
  // ... (all existing state and functions remain the same)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  if (loading) return <div className="container"><h2>Loading projects...</h2></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>My Projects</h1>
        <button className="create-btn" onClick={() => setIsModalOpen(true)}>
          + Create Project
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* ... (Modal form remains the same) */}
        <form onSubmit={handleCreateProject}>
          <h2>Create New Project</h2>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input type="text" id="projectName" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea id="projectDescription" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" className="submit-btn">Create Project</button>
        </form>
      </Modal>

      {projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) => (
            // ** THE CHANGE IS HERE **
            <Link to={`/projects/${project._id}`} key={project._id} className="project-card-link">
              <div className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You haven't created any projects yet.</p>
      )}
    </div>
  );
};

export default DashboardPage;