import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    bedrooms: '',
    price: '',
    location: '',
    image: '',
    description: '', // Changed 'desc' to 'description' to match database column
    amenities: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace('prop-', ''); 
    // Handle the special case where your HTML ID might be 'prop-desc' but DB column is 'description'
    const actualKey = key === 'desc' ? 'description' : key;
    setFormData({ ...formData, [actualKey]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Property added to Database successfully!");
        navigate("/"); 
      } else {
        alert("Failed to save property to database.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Make sure your Node.js server is running!");
    }
  };

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card shadow-sm border-0 p-4">
          <h2 className="mb-4 fw-bold">Add Property (to Database)</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input id="prop-title" className="form-control" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select id="prop-type" className="form-select" value={formData.type} onChange={handleChange} required>
                <option value="">Choose...</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="room">Room</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Bedrooms</label>
              <input id="prop-bedrooms" type="number" className="form-control" value={formData.bedrooms} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Price (PKR)</label>
              <input id="prop-price" type="number" className="form-control" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Location</label>
              <input id="prop-location" className="form-control" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Image URL</label>
              <input id="prop-image" className="form-control" placeholder="/img/property1.jpg" value={formData.image} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea id="prop-desc" className="form-control" rows="4" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="col-12 mt-4">
              <button className="btn btn-success px-5" type="submit">Add Property</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddProperty;