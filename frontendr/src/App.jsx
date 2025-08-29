import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeamDashboard from "./pages/TeamDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <h1>GitHub Contest Tracker</h1>
        <nav>
          <Link to="/">Team</Link> |{" "}
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<TeamDashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
