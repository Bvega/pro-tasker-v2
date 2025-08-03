import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css'; // We will create this file in the next step

const HomePage = () => {
  const { user } = useAuth();

  // If a user is logged in, redirect them away from the public landing page
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, show the hero section
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Pro-Tasker</h1>
        <p className="hero-subtitle">
          The simple, intuitive, and powerful way to manage your projects and tasks.
        </p>
        <Link to="/register" className="hero-cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;