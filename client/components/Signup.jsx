import React from 'react';
import { Navbar } from './Navbar.jsx';

export function SignupForm() {
  return (
    <>
      <Navbar />
      <div className="body2">
        <div className="form_contents">
          <div className="login_form_container">
            <form className="login_form">
              <label>Username</label>
              <input
                type="text"
                className="login_username"
                placeholder="Username"
                value="username"
              ></input>
              <label>Password</label>
              <input
                type="text"
                className="login_password"
                placeholder="Password"
                value="password"
              ></input>
            </form>
          </div>
        </div>
        <div className="submit_button_box">
          <button className="form_submit_button" value="Submit">
            Submit Login Credentials
          </button>
        </div>
      </div>
    </>
  );
}
