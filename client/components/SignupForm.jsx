import React from 'react';
import { Navbar } from './Navbar.jsx';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router';

export function SignupForm(props) {
  const defaultUser = { username: '', password: '' };
  const [signupData, setSignupData] = useState(defaultUser);
  const [displayError, setDisplayError] = useState(false);
  const { setLoggedInStatus } = props;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // when a change happens on the signup input field, it updates with every change.
  const handleOnChange = (event) => {
    const { name, value, contact } = event.target;
    setSignupData((signupData) => ({ ...signupData, [name]: value }));
  };
  // when we submit the data, a function create user will post the request to the server and return the response.
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    async function createUser() {
      try {
        const request = await fetch('/api/user/newuser', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(signupData),
        });

        // if the response is bad, we'll display the error of username already taken.
        if (!request.ok) {
          setDisplayError(true);
        } else {
          // getting the response back from the server and using that data in our global context.
          const response = await request.json();
          const { name, user_id } = response;
          setUserInfo({ name, user_id });
          setLoggedInStatus(true);
          setSignupData(defaultUser);
          navigate('/Home');
        }
      } catch (error) {
        console.error('Error:', error);
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
            Username already taken! Please try another username.
          </p>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
