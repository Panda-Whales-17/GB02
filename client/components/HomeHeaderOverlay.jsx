import React from 'react';

export const HomeHeaderOverlay = ({ openOverlay, addAPI }) => {
  return (
  <div className="overlay">
    <button id="overlay-close-button" onClick={openOverlay}>
      x
    </button>
    <div className="overlay-content">
      <form onSubmit={addAPI}>
        <div className="formGroup">
          <h2>Add Tech</h2>
          <input
            type="text"
            id="add-tech-name"
            className="input-one"
            placeholder="Add API Name"
          />

          <input
            type="text"
            className="input-one"
            id="add-tech-doc-url"
            placeholder="Add API URL"
          />
          <textarea
            className="input-one"
            id="add-tech-description"
            rows="3"
            maxLength="150"
            placeholder="Add Brief Description"
          />
          <input
            type="text"
            className="input-one"
            id="add-tech-image-url"
            placeholder="Add Image URL"
          />
          <input
            type="file"
            className="input-one"
            id="add-tech-image"
            accept="image/*"
          />
        </div>

        <button className="login-button" type="submit">
          Submit!
        </button>
      </form>
    </div>
  </div>
)
}