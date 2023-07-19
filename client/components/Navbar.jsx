import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar({ loggedInStatus, setLoggedInStatus }) {
  const navigate = useNavigate();

  function home() {
    navigate('/Home');
  }
  function comments() {
    navigate('/Comments');
  }
  function profile() {
    navigate('/Profile');
  }
  function login() {
    navigate('/Login');
  }
  function signup() {
    navigate('/Signup');
  }

  function logout() {
    setLoggedInStatus(false);
  }
  

  if (loggedInStatus) {
    return (
      <ul className="Navbar">
        <p>Welcome, {loggedInStatus}!</p>
        <li onClick={home}>Home</li>
        <li onClick={comments}>Comments</li>
        <li onClick={profile}>Profile</li>
        <li onClick={logout}>Logout</li>
      </ul>
    )
  }
  else {
    return (
      <ul className="Navbar">
        <li onClick={home}>Home</li>
        <li onClick={login}>Login</li>
        <li onClick={signup}>Signup</li>
      </ul>
    );
  }
  
}
