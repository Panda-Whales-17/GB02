import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HelperFunctions from '../helper-functions';
import '../styles/Comments.scss';

import { Navbar } from '../components/Navbar.jsx';
import { CommentHeader } from '../components/CommentHeader.jsx';
import { CommentBox } from '../components/CommentBox.jsx';
import { CommentPostOverlay } from '../components/CommentPostOverlay.jsx';


export const CommentsContainer = ({ data }) => {
  //this is the state for the accordian, when the accordian is clicked it invokes an active index
  const [activeIndex, setActiveIndex] = useState(null);

  //state overlay that is changed to true when the button is clicked in order to appear
  const [showOverlay, setShowOverlay] = useState(false);

  //here are the states for the form to keep track of each input
  const [techName, setTechName] = useState('');
  const [techLink, setTechLink] = useState('');
  const [techDescription, setTechDescription] = useState('');
  const [techImage, setTechImage] = useState('');

  //from here we had starting typing out the states to handle the backend format but realized we did not have enough time so it is not connected/finished
  /*
      CREATE TABLE posts(
        post_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        tech INTEGER NOT NULL,
        FOREIGN KEY(tech) REFERENCES techs(tech_id),
        uploader INTEGER NOT NULL,
        FOREIGN KEY(uploader) REFERENCES users(user_id),
        type_review BOOLEAN,
        type_advice BOOLEAN,
        type_code_snippet BOOLEAN,
        type_help_offer BOOLEAN,
        language INTEGER NOT NULL,
        FOREIGN KEY(language) REFERENCES languages (language_id),
        comment VARCHAR(5000) NOT NULL,
        image TEXT
    )
  */

  const [currentTech, setCurrentTech] = useState();
  const [commentEntries, setCommentEntries] = useState([]);

  //to find id of our url
  const { id } = useParams();

  const addComment = async (e) => {
    e.preventDefault();
    const commentTitle = document.getElementById('post-overlay-title-input').value; // title
    const commentLanguage = document.getElementById('post-overlay-language-input').value; // Language
    const commentEditor = document.getElementById('post-overlay-editor-input').value; // Editor
    const commentImage = document.getElementById('post-overlay-image-input').value; // Image

    const newComment = {
      tech_id: id,
      typeReview: false,
      typeAdvice: false,
      typeCodeSnippet: false,
      typeHelpOffer: false,
      languageid: 1,
      title: commentTitle,
      comment: commentEditor,
      image: commentImage
    }
    
    console.log('Submitting comments is commented out until fixed');
    // try {
    //   //on the button click the overlay is set back to false
    //   const response = await fetch('/api/post', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newComment),
    //   });

    //   const data = await response.json();

    //   setShowOverlay(false);
    //   console.log('success');
    //   console.log('data returned', data);
    // } 
    // catch (err) {
    //   console.log('An error occured when making a new post in CommentsContainer.jsx addComment: ' + err);
    // }
  };

  // initializing the page
  useEffect(() => {
    //the tech id is linked to the home page box technology clicked
    const techId = id;

    const fetchData = async () => {
      try {
        const response = await fetch('/api/tech/' + techId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const newData = JSON.parse(JSON.stringify(data));
        // newData =  {tech: tech-obj, posts: [post-obj, post-obj, ..]}
        setCommentEntries(newData.posts);
        setCurrentTech(newData.tech);
        setTechName(newData.tech.name);
        setTechDescription(newData.tech.description);
        setTechLink(newData.tech.link);
        setTechImage(newData.tech.image_url);
        console.log(newData);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const openOverlay = () => {
    showOverlay ? setShowOverlay(false) : setShowOverlay(true);
  };

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const comments = data.map((item, index) => {
    return <CommentBox 
      item={item}
      index={index} 
      activeIndex={activeIndex}
      handleAccordionClick={handleAccordionClick}
      HelperFunctions={HelperFunctions}
    />
  });

  return (
    <div>
      <Navbar />

      <CommentHeader 
        techImage={techImage}
        techLink={techLink}
        techName={techName}
        techDescription={techDescription}
        openOverlay={openOverlay}
      />

      {showOverlay ? <CommentPostOverlay
        openOverlay={openOverlay}
        addComment={addComment}
      /> : null}

      <div className="input-container">
        <input type="text" className="input-bar" placeholder="Search APIs..." />
      </div>

      <div className="accordion">{
        comments}
      </div>
    </div>
  );
};