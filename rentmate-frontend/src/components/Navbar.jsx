import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm px-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">RentEase</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          {/* ADDED: Dashboard Link below */}
          <Link className="btn btn-outline-light me-2" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-outline-light me-2" to="/add">Add Property</Link>
          <Link className="btn btn-light text-success fw-bold" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
