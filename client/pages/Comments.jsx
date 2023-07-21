import React from 'react';
import '../styles/Comments.scss';

import { CommentsContainer } from '../containers/CommentsContainer.jsx';
import { Navbar } from '../components/Navbar.jsx';

const Comments = ({ loggedInStatus, setLoggedInStatus }) => {
  return (
    <div>
      <Navbar
        loggedInStatus={loggedInStatus}
        setLoggedInStatus={setLoggedInStatus}
      />
      <CommentsContainer />
    </div>
  );
};

export default Comments;
