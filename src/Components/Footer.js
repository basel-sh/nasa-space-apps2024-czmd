import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="containerf">
        <div className="row">
          <div id='footerabout' className="col-md-4">
            <h4 className='FAtitle'>About Us</h4>
            <p>This website is supposed to make 3d models for the known planets in our galaxy, Then try using AI and conditions given and published by NASA to estimate How much this planet would be habitable</p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className='ulfooter'>
              <Link className='lii' to='/'>Home</Link>
              <Link className='lii' to='/dashboard'>DashBoard</Link>
              <Link className='lii' to='/HowToUse'>How To Use</Link>
            </ul>
          </div>
        </div>
        <p className="copyright">Copyright 2024 <span style={{color:'#70a8f0'}}>CZMD</span> Team.</p>
      </div>
    </footer>
  );
};

