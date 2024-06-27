import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './App.css';
import About from './About.js';
import icon from './satellite.png'
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';

function App() {

  // api https://api.wheretheiss.at/v1/satellites/25544
  // get: latitude, longitude, altitude, visibility, timestamp (unix time)

  let customIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
  });
  
  let url = 'https://api.wheretheiss.at/v1/satellites/25544';

  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [altitude, setAltitude] = useState(0);
  let [visibility, setVisibility] = useState('idk bro');
  let [time, setTime] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  let isVisible;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setAltitude(data.altitude);
        setVisibility(data.visibility);
        setTime(data.timestamp);
        setIsLoading(false);
      })
      .catch(error => console.error('error:', error));
  }, []);

  let date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();


  if (isLoading) {
    return <div className='loading'>
      <h1>Loading...</h1>
      <p>If this takes too long, refresh the page, or check the logs and contact me at me@smoliicek.xyz</p>
      </div>;
  }
  
    let mapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    if (visibility === 'daylight') {
      isVisible = "The ISS is in daylight! ☀️";
    } else {
      isVisible = "The ISS is in the Earth's shadow. :(";
    }

  return (
    
  <div className='App'>    
    <div className="name">
      <h1>Where is the ISS?</h1>
      <BrowserRouter>
      <Link to="/about" className='about-link'>→</Link>
      </BrowserRouter>
    </div>

    <div className='center'>
    
    <div className='data'>
      <h2>Current Location:</h2>
      <p>Timestamp: {day}/{month}/{year} - {hours}:{minutes}:{seconds}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Altitude: {altitude} km</p>
      <p>{isVisible}</p>
    </div>
    
    <div className='map'>      
      <MapContainer center={[latitude, longitude]} zoom={12}scrollWheelZoom={true}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[latitude, longitude]} icon={customIcon} open={true}>
        <Popup>
          The ISS is up in the sky somewhere around here.
        </Popup>
      </Marker>
    </MapContainer>


    <p>Link to Google Maps: <a href={mapsURL} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
    </div>

    </div>

    <div className='bottom'>
    <button onClick={() => window.location.reload(false)}>Where is it now? I want to know!</button>
    </div>
  </div>
  );
}

export default function routing() {
  return (
    <Router>
    <Routes>
      <Route path="/about" element={<About />} />
    </Routes>
    </Router>
)};