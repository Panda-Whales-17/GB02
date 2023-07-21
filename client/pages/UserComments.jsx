import React, { useContext, useState, useEffect } from 'react';
import '../styles/Comments.scss';
import { CommentBox } from '../components/CommentBox.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { UserContext } from '../contexts/UserContext.jsx';
import { useParams } from 'react-router-dom';

export function UserComments({ loggedInStatus, setLoggedInStatus }) {
  const { userInfo } = useContext(UserContext);
  const [techData, setTechData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [commentsToRender, setCommentsToRender] = useState([]);

  const renderPosts = () => {
    fetch(`/api/user/${userInfo.user_id}`)
      .then((response) => response.json())
      .then((data) => setCommentsToRender(data))
      .catch((err) =>
        console.log(
          'And error occured in UserComments useEffect when fetching the posts: ' +
            err
        )
      );
  };

  const deletePost = (item) => {
    fetch('/api/post/' + item.post_id, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) renderPosts();
        else {
          console.log(
            'Did not receive OK from response in deletePost: ',
            response.status
          );
        }
      })
      .catch((err) => {
        console.log(
          'An error occured when deleting post in CommentsContainer.jsx deletePost: ' +
            err
        );
      });
  };

  useEffect(() => {
    renderPosts();
  }, []);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const comments = commentsToRender.map((item, index) => {
    return (
      <CommentBox
        key={index + 'commentBox'}
        item={item}
        index={index}
        activeIndex={activeIndex}
        handleAccordionClick={handleAccordionClick}
        deletePost={deletePost}
      />
    );
  });
  return (
    <>
      <Navbar
        loggedInStatus={loggedInStatus}
        setLoggedInStatus={setLoggedInStatus}
      />
      <div className="container-primary">
        <div className="accordion"></div>
        {comments.length > 0 ? comments : <p>No posts yet!</p>}
      </div>
    </>
  );
}
