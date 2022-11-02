import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Header.css';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="icons-block" onClick={() => navigate('/')} >
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
