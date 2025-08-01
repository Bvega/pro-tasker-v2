import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import Modal from '../components/Modal';
import './ProjectPage.css';
import './Form.css';

const ProjectPage = () => {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for Create Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // ** NEW STATE FOR EDIT MODAL **
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // To hold the task being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');


  const loadProjectData = useCallback(async () => {
    try {
      const projectData = await projectService.getProjectById(projectId);
      const tasksData = await taskService.getTasksByProject(projectId);
      setProject(projectData);
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load project data.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(projectId, { title: taskTitle, description: taskDescription });
      setTaskTitle(''); setTaskDescription('');
      setIsCreateModalOpen(false);
      loadProjectData();
    } catch (err) { console.error('Failed to create task', err); }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(projectId, taskId, { status: newStatus });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
    } catch (err) { console.error('Failed to update task status', err); }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(projectId, taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (err) { console.error('Failed to delete task', err); }
    }
  };

  // ** NEW FUNCTIONS FOR EDITING TASKS **
  const openEditModal = (task) => {
    setCurrentTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTaskData = await taskService.updateTask(projectId, currentTask._id, {
        title: editTitle,
        description: editDescription,
      });
      // Update local state for immediate UI change
      setTasks(tasks.map(task => (task._id === currentTask._id ? updatedTaskData : task)));
      setIsEditModalOpen(false);
      setCurrentTask(null);
    } catch (err) { console.error('Failed to update task', err); }
  };


  if (loading) return <div className="container"><h2>Loading...</h2></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;
  if (!project) return <div className="container"><p>Project not found.</p></div>;

  return (
    <div className="container">
      <Link to="/dashboard" className="back-link">&larr; Back to Dashboard</Link>
      <div className="project-header"><h1>{project.name}</h1><p>{project.description}</p></div>
      
      <div className="tasks-section">
        <div className="tasks-header">
          <h2>Tasks</h2>
          <button className="create-btn" onClick={() => setIsCreateModalOpen(true)}>+ Add Task</button>
        </div>
        
        {/* Create Task Modal */}
        <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
            <form onSubmit={handleCreateTask}>
                <h2>Add New Task</h2>
                <div className="form-group"><label htmlFor="taskTitle">Title</label><input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required /></div>
                <div className="form-group"><label htmlFor="taskDescription">Description</label><textarea id="taskDescription" rows="4" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea></div>
                <button type="submit" className="submit-btn">Add Task</button>
            </form>
        </Modal>

        {/* ** NEW EDIT TASK MODAL ** */}
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
            <form onSubmit={handleUpdateTask}>
                <h2>Edit Task</h2>
                <div className="form-group"><label htmlFor="editTaskTitle">Title</label><input type="text" id="editTaskTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required /></div>
                <div className="form-group"><label htmlFor="editTaskDescription">Description</label><textarea id="editTaskDescription" rows="4" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea></div>
                <button type="submit" className="submit-btn">Save Changes</button>
            </form>
        </Modal>

        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-card-header">
                  <h3>{task.title}</h3>
                  <select className="status-select" value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                    <option value="To Do">To Do</option><option value="In Progress">In Progress</option><option value="Done">Done</option>
                  </select>
                </div>
                <p>{task.description}</p>
                <div className="task-card-footer">
                  <span className={`status-badge status-${task.status.replace(/\s+/g, '-')}`}>{task.status}</span>
                  <div className="task-actions">
                    <button onClick={() => openEditModal(task)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (<p>No tasks found for this project yet.</p>)}
      </div>
    </div>
  );
};

export default ProjectPage;