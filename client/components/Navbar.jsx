import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';

export function Navbar({ loggedInStatus, setLoggedInStatus }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

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
        <p>Welcome, {userInfo.username}!</p>
        <li onClick={home}>Home</li>
        <li onClick={comments}>Comments</li>
        <li onClick={profile}>Profile</li>
        <li onClick={logout}>Logout</li>
      </ul>
    );
  } else {
    return (
      <ul className="Navbar">
        <li onClick={home}>Home</li>
        <li onClick={login}>Login</li>
        <li onClick={signup}>Signup</li>
      </ul>
    );
  }
}
