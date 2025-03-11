import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router"; 


function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App