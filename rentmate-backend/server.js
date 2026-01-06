const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'rentease_db'
});

db.connect(err => {
  if (err) console.error("Pantry is locked!", err);
  else console.log("Pantry is open (MySQL Connected)!");
});

// --- USER LOGIN ROUTE ---
// This checks the 'users' table you created in phpMyAdmin
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const sql = "SELECT id, name, email FROM users WHERE email = ? AND password = ?";
  
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Server error" });
    } else if (results.length > 0) {
      // Login successful! Send back user info
      res.json({ message: "Login successful", user: results[0] });
    } else {
      // No match found
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

// --- PROPERTY ROUTES ---

// GET: To show properties on your Listings page
app.get('/api/properties', (req, res) => {
  db.query("SELECT * FROM properties", (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

// POST: This is what moves data INTO your columns
app.post('/api/properties', (req, res) => {
  const { title, location, price, type, bedrooms, image, description } = req.body;
  
  // NOTE: 'bedroom' matches your phpMyAdmin column exactly
  const sql = "INSERT INTO properties (title, location, bedroom, type, image, description, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [title, location, bedrooms, type, image, description, price], (err, result) => {
    if (err) {
      console.error("Failed to add property:", err);
      res.status(500).send(err);
    } else {
      res.json({ message: "Data moved to columns!", id: result.insertId });
    }
  });
});

// DELETE: To remove a property (requires an 'id' column in your table)
app.delete('/api/properties/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM properties WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Property deleted successfully!" });
    }
  });
});

app.listen(5000, () => console.log("Chef is cooking on port 5000"));
