import './Nav.css';
import React from 'react';

function Nav(props) {
  const appName = 'StMaker';
  const appSlogan = 'Typology-ing your street';
  return (
    <nav className="nav">
      <div className="nav-left">
        <h1 className="nav-title">{appName}</h1>
      </div>
      <div className="nav-right">
        <h2 className="nav-subtitle">{appSlogan}</h2>
        <span className="material-symbols-outlined">
            info
        </span>
      </div>
    </nav>
  );
}

export default Nav;

