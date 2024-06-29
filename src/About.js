import App from './App.js'
import { Link } from 'react-router-dom';
import './App.css'
import React from 'react';

function About() {
    return (
       <div>

       <div className="name">
            <h1>Where is the ISS?</h1>
            <Link to="/" className='about-link'>←</Link>
        </div>

        <div className='about-text'>
            <h1>About</h1>
            <p>Hey, I'm Smajl, and I made this site. This site is made in React, uses <a href="https://wheretheiss.at/"> this</a> API to fetch the current position of the ISS, it also uses leaflet for the map embed.</p>
            <p>The site is made for HackClub Arcade, which is a "challenge" for the summer to make some applications, websites etc.</p>
            <p>Hope you like it! 😉</p>
        </div>

        </div>

    );
}

export default About;