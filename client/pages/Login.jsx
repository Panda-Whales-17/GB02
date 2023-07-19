import React, { useEffect, useState } from 'react';
//add containers and requirements for JS
import { Navbar } from '../components/Navbar.jsx';
import { useNavigate } from 'react-router';

const Login = (props) => {
  //create a state of invalid username/passowrd initialized to false
  const [invalidLogin, setShowInvalidLogin] = useState(false);
  const { loggedIn, setLoggedInStatus } = props;
  const navigate = useNavigate();

  // handling submission from form when user clicks submit or presses enter.
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // destructuring the username and password from the event.target object.
    const { username, password } = e.target;

    // declaring an async function to submit the data to the endpoint.
    async function submitLoginData() {
      try {
        const response = await fetch('/api/user/login', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
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

/* 

const [UN, setUN] = setState('')

const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: UN, password: PW }),      <-
      });
      console.log(response);
      const data = response.json();
      if (response.ok) {
        console.log('Frontend Login successful');
        setIsLoggedIn(true);
      } else {
        console.log('Frontend Login unsuccesful');
        setIncorrect('Incorrect combination. Try again.');
      }
    } catch (err) {
      console.error('Error in Frontend Login');
    }
  };



  HTML:
  <Button onClick={() => handleLogin())}>

  <input 
  type='text' 
  className='login_username' 
  placeholder='Username' 
  onChange={(e) => setPW(e.target.value)
  ></input>



  function mergedFunction() {
    const username = dummy.innerhtml
    setUN(username)
    handleLogin()
  }


  <Button classname='dummy' onClick={mergedFunction}>

*/
