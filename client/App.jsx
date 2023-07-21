import React, { useState, useEffect } from 'react';
// import helperFunctions from './helper-functions.js';
import { Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import { Home } from './pages/Home.jsx';
import Comments from './pages/Comments.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import './styles/_appStyles.scss';
import { SignupForm } from './components/SignupForm.jsx';
import { UserContext } from './contexts/UserContext.jsx';
import { UserComments } from './pages/UserComments.jsx';

const App = () => {
  //create a High Level state for whether the user is logged in or not
  //make the loggedInStatus either false OR the User's ID/cookie from database as idenfier
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const defaultUser = { username: '', user_id: null };
  const [userInfo, setUserInfo] = useState(defaultUser);

  // this use effect runs every time the page is first loaded to see if a user is logged in. If they are not logged in, it'll have a nav bar for them to login or signup.
  useEffect(() => {
    async function checkForLoggedIn() {
      const request = await fetch('/api', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      // if a session does exist in the database, they are automatically logged in until they sign out.
      const response = await request.json();
      const { username, user_id } = response;
      username ? setLoggedInStatus(true) : setLoggedInStatus(false);

      // immediately setting the userInfo if they are still logged in.
      setUserInfo({ username, user_id });
    }
    checkForLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Routes>
        <Route
          index
          element={
            <Home
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="home"
          element={
            <Home
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="comments/:id"
          element={
            <Comments
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="profile"
          element={
            <Profile
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="signup"
          element={
            <SignupForm
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
        <Route
          path="userComments"
          element={
            <UserComments
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
            />
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;

// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;
