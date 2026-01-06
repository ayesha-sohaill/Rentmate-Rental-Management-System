import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

function Dashboard() {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch from Backend Chef
    fetch("http://localhost:5000/api/properties")
      .then(res => res.json())
      .then(data => {
        setMyProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Database Dashboard</h2>
          <button onClick={() => navigate("/add")} className="btn btn-success">Add New Property</button>
        </div>

        {loading ? (
          <p>Loading your properties...</p>
        ) : myProperties.length > 0 ? (
          <div className="row g-4">
            {myProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded shadow-sm border">
            <p className="text-muted">No properties found in the database.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;