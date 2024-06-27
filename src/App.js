import React, { useState, useEffect } from 'react';
import './App.css';
import { isVisible } from '@testing-library/user-event/dist/utils';

function App() {

  // api https://api.wheretheiss.at/v1/satellites/25544
  // get: latitude, longitude, altitude, visibility, timestamp (unix time)

  let url = 'https://api.wheretheiss.at/v1/satellites/25544';

  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [altitude, setAltitude] = useState(0);
  let [visibility, setVisibility] = useState('idk bro');
  let [time, setTime] = useState(0);
  let isVisible;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setAltitude(data.altitude);
      setVisibility(data.visibility);
      setTime(data.timestamp);
    })
    .catch(error => console.error('Error fetching quote:', error));

    if (visibility === 'daylight') {
      isVisible = "The ISS is in daylight! :D";
    } else {
      isVisible = "The ISS is in the Earths shadow. :(";
    }
    


  return (
  <div>    
    <div className="name">
      <h1>Where is the ISS?</h1>
    </div>

    <div className='center'>
    
    <div className='data'>
      <h2>Current Location:</h2>
      <p>Timestamp: {time} (somehow convert this, thanks)</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Altitude: {altitude} km</p>
      <p>{isVisible}</p>
    </div>

    <div className='map'>
      {/* https://developers.google.com/maps/documentation/embed/embedding-map */}
      <p>THE MAP (the location of ISS on gmaps) WILL BE HERE</p>
      <p>link to google maps: figuring out, wait, thx</p>
    </div>

    </div>

    <div className='bottom'>
      <button onClick={() => window.location.reload(false)}>Get new data</button>
    </div>
  </div>
  );
}

export default App;
