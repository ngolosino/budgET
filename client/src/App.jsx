import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analytics from './pages/Analytics';
import Category from './pages/Category';
import Expenses from './pages/Expenses';
import Settings from './pages/Settings';
import DashboardLayout from './components/DashboardLayout';


function App() {


  return (
    <Router>
      <Routes>
        {/* Default page is Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path="expenses" element={<Expenses/>} />        
          <Route path="category" element={<Category/>} />        
          <Route path="analytics" element={<Analytics/>} />        
          <Route path="settings" element={<Settings/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App
