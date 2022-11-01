import React from 'react';
import '../../css/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="icons-block">
        <img className="nisum-image" src="../../nisum.jpeg" alt="nisum-logo" />
      </div>
      <div className="account-container">
        <div className="account-avatar">
          <img className="avatar" src="../../user.png" alt="account-avatar" />
        </div>
      </div>
    </div>
  );
}

export default Header;
