import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This clears the user state and token
    navigate('/login'); // This redirects the user to the login page
  };

  // This JSX is shown ONLY when a user is logged in
  const authLinks = (
    <li className="nav-item">
      <button onClick={handleLogout} className="nav-links-button">
        Logout
      </button>
    </li>
  );

  // This JSX is shown ONLY when no user is logged in
  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-links">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-links">
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={user ? "/dashboard" : "/"} className="navbar-logo">
          Pro-Tasker
        </Link>
        <ul className="nav-menu">
          {user ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;