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
            <h3>We aim for facilitating the searching of the HWO Planets by the average simple user</h3>

            
        </div>
    </section>

    <section className="cards" id="services">
        <h2 className="title">What we can do ?</h2>
        <div className="content">
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
                    <div className="info">
                        <h3>Navigating HWO Planets</h3>
                        <p>You can use this service rendering the solar system of a discoverd Stars system.</p>
                    </div>
                </div>
            </div>
            {/* ///////////// */}
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-microchip"></i>
                    <div className="info">
                        <h3>Usin AI  to predict if it is habitable</h3>
                        <p>We use AI that depends on some conditions announced by NASA to predict with a percentage if it can be habitable or not.</p>

                    </div>
                </div>
            </div>
            {/* ///////////// */}
            <div className="card">
                <div className="icon">
                <i className="fa-solid fa-circle-info"></i>
                    <div className="info">
                        <h3>Reading Bodies informations</h3>
                        <p>Every Planet you can render you can read All the information of this plannet given by NASA DataBase.</p>

                    </div>
                </div>
            </div>
            {/* ///////////// */}
        </div>
    </section>
    </div>
  );
}