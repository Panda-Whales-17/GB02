import React from 'react';
import { useState } from 'react';

export function HomeHeaderContainer() {
  //overlay state for showing the form, set true to appear
  const [showOverlay, setShowOverlay] = useState(false);
  //state for the form inputs
  const [apiName, setApiName] = useState('');
  const [apiURL, setApiURL] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [apiImageURL, setApiImageURL] = useState('');

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  // REVIEW: data looks unaffected, but not sure if we'll have to prop drill elsewhere now that data is localized into another file.
  const addAPI = async (event) => {
    console.log('addAPI inside');
    event.preventDefault();

    try {
      setShowOverlay(false);

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: apiName,
          link: apiURL,
          image: apiImageURL,
          typeApi: false,
          typeFramework: false,
          typeLibrary: false,
          description: apiDescription,
          keywords: ['maps'],
        }),
      });

      const data = await response.json();
      console.log('success');
      console.log('data returned', data);
    } catch (err) {
      console.log(err);
    }
  };

  // FIXME: div usage in here is insane. Not sure if it's all necessary. Will probably need to take a look.
  return (
    <div className="main-header">
      <div className="content">
        <div className="home-top-all-content">
          <h2>Cohort: CTRI 17</h2>
          <img src="./logo.png"></img>
          <button className="button" onClick={openOverlay}>
            + ADD TECH
          </button>
        </div>
        <input
          type="text"
          className="input-bar-home"
          placeholder="Search APIs..."
        />
        {showOverlay && (
          <div className="overlay">
            <button id="overlay-close-button" onClick={handleCloseOverlay}>
              x
            </button>
            <div className="overlay-content">
              <form>
                <div className="formGroup">
                  <h2>Add Tech</h2>
                  <input
                    type="text"
                    className="input-one"
                    placeholder="Add API Name"
                    value={apiName}
                    onChange={(event) => {
                      setApiName(event.target.value);
                    }}
                  />

                  <input
                    type="text"
                    className="input-one"
                    placeholder="Add API URL"
                    value={apiURL}
                    onChange={(event) => {
                      setApiURL(event.target.value);
                    }}
                  />
                  <textarea
                    className="input-one"
                    rows="3"
                    maxLength="150"
                    placeholder="Add Brief Description"
                    value={apiDescription}
                    onChange={(event) => {
                      setApiDescription(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="input-one"
                    placeholder="Add Image URL"
                    value={apiImageURL}
                    onChange={(event) => {
                      setApiImageURL(event.target.value);
                    }}
                  />
                  <input
                    type="file"
                    className="input-one"
                    accept="image/*"
                  />
                </div>

                <button className="login-button" onClick={addAPI}>
                  Submit!
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
