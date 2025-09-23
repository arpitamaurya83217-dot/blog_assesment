import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateEditBlog from './pages/CreateEditBlog';
import ProtectedRoute from './components/ProtectedRoute';
import { setAuthToken } from './services/api';
import './App.css';


function App(){
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/create" element={<ProtectedRoute><CreateEditBlog /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><CreateEditBlog edit /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

