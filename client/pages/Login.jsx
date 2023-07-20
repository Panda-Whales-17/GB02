import React, { useEffect, useState, useContext } from 'react';
//add containers and requirements for JS
import { Navbar } from '../components/Navbar.jsx';
import { useNavigate } from 'react-router';
import { UserContext } from '../contexts/UserContext.jsx';

const Login = (props) => {
  //create a state of invalid username/passowrd initialized to false
  const [invalidLogin, setShowInvalidLogin] = useState(false);
  const { setLoggedInStatus } = props;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // handling submission from form when user clicks submit or presses enter.
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // destructuring the username and password from the event.target object.
    const { username, password } = e.target;

    // declaring an async function to submit the data to the endpoint.
    async function submitLoginData() {
      try {
        const request = await fetch('/api/user/login', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
        // if the response is bad, or in this case, non matching password, display the invalid login.
        if (!request.ok) {
          setShowInvalidLogin(true);

          // assign the global username for it to be accessed across the site.
        } else {
          const response = await request.json();
          setUserInfo({
            ...userInfo,
            username: response.username,
            user_id: response.user_id,
          });
          setLoggedInStatus(true);
          navigate('/Home');
        }
      } catch (error) {
        console.log(error);
      }
    }
    submitLoginData();
  };

  return (
    <>
      <Navbar />
      <div className="login_form_container">
        <form className="login_form" onSubmit={handleLoginSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="login_username"
            placeholder="Username"
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="login_password"
            placeholder="Password"
          ></input>
          <button className="form_submit_button" value="Submit">
            Submit Login Credentials
          </button>
        </form>
      </div>
      <div className="response_button">
        {invalidLogin && (
          <div className="invalid_login">Invalid Username Or Password</div>
        )}
      </div>
    </>
  );
};

export default Login;
