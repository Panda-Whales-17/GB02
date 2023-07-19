import React from 'react';
import { useState } from 'react';

import { HomeHeader } from '../components/HomeHeader.jsx';
import { HomeHeaderOverlay } from '../components/HomeHeaderOverlay.jsx';

export function HomeHeaderContainer() {
  //overlay state for showing the form, set true to appear
  const [showOverlay, setShowOverlay] = useState(false);
  //state for the form inputs

  const openOverlay = () => {
    showOverlay ? setShowOverlay(false) : setShowOverlay(true);
  };

  // REVIEW: data looks unaffected, but not sure if we'll have to prop drill elsewhere now that data is localized into another file.
  const addAPI = async (event) => {
    console.log('addAPI inside');
    event.preventDefault();

    const techName = document.getElementById('add-tech-name').value;
    const techDocUrl = document.getElementById('add-tech-doc-url').value;
    const techDescription = document.getElementById('add-tech-description').value;
    const techImageUrl = document.getElementById('add-tech-image-url').value;
    const techImage = document.getElementById('add-tech-image').value;

    const newApi = {
      name: techName,
      typeApi: false,
      typeFramework: false,
      typeLibrary: false,
      link: techDocUrl,
      description: techDescription,
      image: techImage,
      keywords: ['maps']
    }

    try {
      setShowOverlay(false);

      const response = await fetch('/api/tech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApi),
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
        <HomeHeader openOverlay={openOverlay} />
        
        {showOverlay && <HomeHeaderOverlay 
          openOverlay={openOverlay}
          addAPI={addAPI}
        />}
      </div>
    </div>
  );
}
