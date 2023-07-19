import React, { useEffect, useState, createContext } from 'react';
// import helperFunctions from './helper-functions.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//add containers and requirements for JS
import { Home } from './pages/Home.jsx';
import Comments from './pages/Comments.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import './styles/_appStyles.scss';
import { SignupForm } from './components/SignupForm.jsx';

const App = () => {
  //create a High Level state for whether the user is logged in or not
  //make the loggedInStatus either false OR the User's ID/cookie from database as idenfier
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const LoggedInContext = createContext();

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;
