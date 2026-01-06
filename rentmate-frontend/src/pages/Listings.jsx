import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

function Listings() {
  const [allProperties, setAllProperties] = useState([]); // Original list from Backend
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered list
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [loading, setLoading] = useState(true); // Added loading state

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    bedrooms: '',
    maxPrice: ''
  });

  // 1. CHANGED: Load data from Node.js Backend instead of LocalStorage
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setAllProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error("Chef didn't answer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // 2. The Filter Logic (Remains the same, works with the new data)
  useEffect(() => {
    let result = allProperties.filter(p => {
      const matchSearch = (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.location || "").toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchLoc = filters.location === '' || (p.location || "").toLowerCase().includes(filters.location.toLowerCase());
      const matchType = filters.type === '' || p.type === filters.type;
      
      const matchBeds = filters.bedrooms === '' || 
                        (filters.bedrooms === '3' ? p.bedrooms >= 3 : p.bedrooms == filters.bedrooms);
      
      const matchPrice = filters.maxPrice === '' || p.price <= parseFloat(filters.maxPrice);

      return matchSearch && matchLoc && matchType && matchBeds && matchPrice;
    });

    setFilteredProperties(result);
  }, [searchTerm, filters, allProperties]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ location: '', type: '', bedrooms: '', maxPrice: '' });
  };

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row g-4">
          
          {/* SIDEBAR FILTERS */}
          <aside className="col-lg-3">
            <div className="card p-3 shadow-sm border-0">
              <h5 className="fw-bold mb-3">Filters</h5>
              <div className="mb-3">
                <label className="form-label small fw-bold">Location</label>
                <input 
                  className="form-control" 
                  placeholder="City" 
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Type</label>
                <select 
                  className="form-select"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="room">Room</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Bedrooms</label>
                <select 
                  className="form-select"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Max Price</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="e.g. 50000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
              <button className="btn btn-outline-secondary btn-sm w-100" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </aside>

          {/* MAIN LISTINGS AREA */}
          <section className="col-lg-9">
            <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                   <i className="bi bi-search"></i> Search
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0" 
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="btn-group">
                <button 
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('grid')}
                >Grid</button>
                <button 
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('list')}
                >List</button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status"></div>
                <p className="mt-2 text-muted">Asking the Chef for house listings...</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(prop => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                      isList={viewMode === 'list'} 
                    />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted">No properties match your search.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div> 
    </main>
  );
}

export default Listings;
