import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info so the Dashboard knows who logged in
        localStorage.setItem("rentease_user", JSON.stringify(data.user));
        alert(`Welcome back, ${data.user.name}!`);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Backend is not running!");
    }
  };

  return (
    <main className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow border-0 p-4">
              <h2 className="fw-bold mb-4 text-center">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;