import React from 'react';

export const CommentHeader = ({ techImage, techLink, techName, techDescription, openOverlay }) => {
  return (
    <div className="container-header">
      <div className="comment-data-box">
        <img className="comment-data-image" src={techImage}></img>
        <div>
          <a href={techLink} className="comment-tech-link">
            <h2>{techName}</h2>
          </a>
          <p className="comment-tech-description">{techDescription}</p>
        </div>
      </div>
      <button className="button" onClick={openOverlay}>+ ADD POST</button>
    </div>
  )
}