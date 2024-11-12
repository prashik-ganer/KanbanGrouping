import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="left">
          <h3>Trello Clone</h3>
        </div>
        <div className="right">
          <span>Remote Dev</span>
          <img className="profile-image" src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
