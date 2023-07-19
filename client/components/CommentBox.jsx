import React from 'react';

export function CommentBox({ item, index, activeIndex, handleAccordionClick, HelperFunctions }) {
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
          <div>{item.title}</div>
          <div className="details">
            <p className="username">{item.username}</p>
            <p className="tags">Posted by: Steve</p>
          </div>
        </div>
      </div>
      {index === activeIndex && (
        <div className="accordion-content">
          <div>
            <div className="experience">
              {HelperFunctions.md(item.comment)}
            </div>
            <img src={item.image} alt="Image" className="accordion-image" />
          </div>
        </div>
      )}
    </div>
  );
}