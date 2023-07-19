import React from 'react';
import { Navbar } from './Navbar.jsx';
import { useState } from 'react';

export function SignupForm() {
  const defaultUser = { username: '', password: '' };
  const [signupData, setSignupData] = useState(defaultUser);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setSignupData((signupData) => ({ ...signupData, [name]: value }));
  };
  console.log(signupData);
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    async function createUser() {
      try {
        await fetch('/api/user', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(signupData),
        });
        setSignupData(defaultUser);
      } catch (error) {
        console.log(error);
      }
    }
    createUser();
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSignupSubmit} className="signup-form">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="login-username"
          value="username"
          onChange={handleOnChange}
        ></input>
        <label>Password</label>
        <input
          type="text"
          name="password"
          className="login-password"
          value="password"
          onChange={handleOnChange}
        ></input>
        <button className="form_submit_button" value="Submit">
          Submit Login Credentials
        </button>
      </form>
    </>
  );
}
