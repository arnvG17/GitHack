import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeamDashboard from "./pages/TeamDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [count, setCount] = useState(0)

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
  )
}

export default App
