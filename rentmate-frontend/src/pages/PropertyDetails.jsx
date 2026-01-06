import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PropertyDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from Backend
    fetch("http://localhost:5000/api/properties")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(id));
        if (found) setProperty(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-success"></div></div>;

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h3>Property Not Found in Database</h3>
        <button className="btn btn-success mt-3" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>← Back</button>
        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-7">
              <img src={property.image} className="img-fluid w-100 h-100" alt={property.title} style={{ objectFit: 'cover', minHeight: '450px' }} />
            </div>
            <div className="col-md-5 bg-white">
              <div className="card-body p-4 p-lg-5">
                <span className="badge bg-success mb-2 px-3 py-2">{property.type}</span>
                <h1 className="fw-bold display-6">{property.title}</h1>
                <p className="text-muted fs-5">{property.location}</p>
                <div className="my-4 p-3 bg-light rounded">
                  <h2 className="text-success fw-bold mb-0">PKR {property.price?.toLocaleString()}</h2>
                  <p className="mb-0 text-secondary">{property.bedrooms} Bedrooms</p>
                </div>
                <hr />
                <h5 className="fw-bold mt-4">About this property</h5>
                <p className="text-muted">{property.description}</p>
                <div className="mt-5">
                  <button className="btn btn-success w-100 py-3 fw-bold">Contact Owner</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PropertyDetails;
