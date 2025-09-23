import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../services/api';

export default function Navbar(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <nav style={{ display:'flex', gap:10, padding:10, borderBottom:'1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {user ? <>
        <Link to="/create">Create</Link>
        <span>Hi, {user.name}</span>
        <button onClick={logout}>Logout</button>
      </> : <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>}
    </nav>
  );
}

