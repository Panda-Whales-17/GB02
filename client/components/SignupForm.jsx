import React from 'react';
import { Navbar } from './Navbar.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SignupForm(props) {
  const defaultUser = { username: '', password: '' };
  const [signupData, setSignupData] = useState(defaultUser);
  const [displayError, setDisplayError] = useState(false);
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value, contact } = event.target;
    setSignupData((signupData) => ({ ...signupData, [name]: value }));
  };
  console.log(signupData);
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    async function createUser() {
      try {
        await fetch('/api/user/newuser', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(signupData),
        });
        setSignupData(defaultUser);
        setIsLoggedIn(true);
        setDisplayError(false);
        navigate('/Home');
      } catch (error) {
        console.log(error);
        setDisplayError(true);
      }
    }
    createUser();
  };

  return (
    <>
      <Navbar />
      <div className="login_form_container">
        <form onSubmit={handleSignupSubmit} className="signup-form">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="login_username"
            placeholder="Username"
            required
            onChange={handleOnChange}
          ></input>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="login_password"
            placeholder="Password"
            required
            onChange={handleOnChange}
          ></input>
          <label>Phone Number:</label>
          <input
            type="text"
            name="contact"
            className="login_contact"
            placeholder="Phone Number"
            required
            onChange={handleOnChange}
          ></input>
          <button className="form_submit_button" value="Submit">
            Submit
          </button>
        </form>
        {displayError ? (
          <p id="signup-error">
            Username Already taken! Please try another username
          </p>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
