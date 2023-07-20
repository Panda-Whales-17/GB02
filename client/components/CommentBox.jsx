import React from 'react';
import HelperFunctions from '../helper-functions';

export function CommentBox({ item, index, activeIndex, handleAccordionClick }) {
  return (
    <div
      key={index}
      className={`accordion-item ${index === activeIndex ? 'active' : ''}`}
    >
      <div className="accordion-header-outer">
        <div
          className="accordion-header"
          onClick={() => handleAccordionClick(index)}
        >
          <div>{item.title || 'No title'}</div>
          <div className="details">
            <p className="username">Posted By: {item.name}</p>
            <p className="tags"></p>
          </div>
        </div>
      </div>
      {index === activeIndex && (
        <div className="accordion-content">
          <div>
            <div className="experience">
              {HelperFunctions.md(item.comment)}
            </div>
            <img src={item.image} className="accordion-image" />
          </div>
        </div>
      )}
    </div>
  );
}