// import Navbar from "./Components/Header"

// export default function Home(){
//   return(
//     <div>
//       <Navbar/>
//       <h1>Home</h1>
//     </div>
//   )
// }
import React from 'react';
import Navbar from "./Components/Header";
import { useState,useEffect } from 'react';

export default function Home() {





  return (
    <div className="home-container">

      <Navbar />
    <section className="main">
        <div>
            <h2>Hello, We are<br></br><span>CZMD</span></h2>
            <h3>We aim to visualise the Habitable World Observatory HWO's search of exoplanets for the average user.</h3>

            
        </div>
    </section>

    <section className="cards" id="services">
        <h2 className="title">What we can do ?</h2>
        <div className="content">
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
                    <div className="info">
                        <h3>Navigating Exoplanets</h3>
                        <p>You can use this service to render the solar system of a discovered exostarial system.</p>
                    </div>
                </div>
            </div>
            {/* ///////////// */}
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-microchip"></i>
                    <div className="info">
                        <h3>Using AI to Predict If They Are Habitable</h3>
                        <p>We use AI that depends on some conditions announced by NASA to predict a percentage of whether the exoplanet can be habitable or not.</p>

                    </div>
                </div>
            </div>
            {/* ///////////// */}
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-circle-info"></i>
                    <div className="info">
                        <h3>Reading Bodies' Information</h3>
                        <p>You can read All information available on your chosen planet across various NASA databases in a simple, clear manner.</p>

                    </div>
                </div>
            </div>
            {/* ///////////// */}
        </div>
    </section>
    </div>
  );
}