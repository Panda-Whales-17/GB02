import React from 'react';

export const HomeHeader = ({ openOverlay }) => {


  return (
    <div className="home-top-all-content">
      <h2>Cohort: CTRI 17</h2>
      <img src="./logo.png"></img>
      <button className="button" onClick={openOverlay}>
        + ADD TECH
      </button>
    </div>
  )
}