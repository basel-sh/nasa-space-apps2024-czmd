import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="divnavbar">
    <nav className="navbar">
      <div className ="logo">
        CZMD
      </div>
      <ul className="navMenu">
        <Link className='lii' to='/'>Home</Link>
        <Link className='lii' to='/dashboard'>DashBoard</Link>
        <Link className='lii' to='/About'>How to Use</Link>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;