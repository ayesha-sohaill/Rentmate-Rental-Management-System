import { Link } from 'react-router-dom';
import React from 'react';

function PropertyCard({ property }) {
  // Logic for commas (Matches your script.js logic)
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={property.image} 
          className="card-img-top" 
          alt={property.title} 
          /* FIXED: Changed object-fit to objectFit */
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{property.title}</h5>
          <p className="mb-1 text-muted small">{property.location} • {property.type}</p>
          <p className="mb-2 fw-bold text-success">PKR {formatPrice(property.price)}</p>
          <p className="mb-3 text-truncate small">{property.description}</p>
          
          <div className="mt-auto d-flex justify-content-between align-items-center">
            {/* CHANGED: button replaced with Link tag */}
            <Link to={`/property/${property.id}`} className="btn btn-outline-primary btn-sm">
              View Details
            </Link>
            <span className="badge bg-light text-dark">{property.bedrooms} Bedrooms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;