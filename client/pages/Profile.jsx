import React, { useState, useContext, useEffect } from 'react';
//add containers and requirements for JS
import HelperFunctions from '../helper-functions.js';

import { Navbar } from '../components/Navbar.jsx';
import { UserContext } from '../contexts/UserContext.jsx';

const Profile = ({ loggedInStatus, setLoggedInStatus }) => {
  const [userInfoExtended, setUserInfoExtended] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      fetch('/api/user/profile/' + userInfo.username)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return setUserInfoExtended(data);
        })
        .catch((err) =>
          console.log(
            'An error occured in Profile.jsx getting userInfoExtended: ',
            err
          )
        );
    }
  }, [userInfo]);

  if (userInfoExtended) {
    return (
      <div className="wrapper">
        <Navbar
          loggedInStatus={loggedInStatus}
          setLoggedInStatus={setLoggedInStatus}
        />
        <div className="body">
          <div className="profile_picture">
            <img
              src="https://live.staticflickr.com/7045/6883014842_9553b47edd_b.jpg"
              style={{ width: '480px', height: '360px' }}
            />
          </div>
          <div className="profile_name">
            Name
            <div className="profile_text">{userInfoExtended.user.name}</div>
          </div>
          <div className="profile_friends">
            Friends List
            <div className="profile_friends_list">No friends :(</div>
          </div>
          <div className="profile_comments">
            Recent Comments
            <div className="profile_comments_list">
              {userInfoExtended.posts.map((item) => {
                return <p>{HelperFunctions.md(item.comment)}</p>;
              })}
            </div>
          </div>
          <div className="profile_apis">
            Recent API's Added
            <div className="profile_APIs_list">FETCHED Your recent api's</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>No user logged in :(</h1>;
  }
};

export default Profile;
