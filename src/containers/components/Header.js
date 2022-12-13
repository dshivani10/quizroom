import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../css/Header.css';

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  function avatarClick(){
    if(user.email.length > 0){
      navigate('/app/profile')
    }else{
      navigate('/app/login')
    }
  }
  return (
    <div className="header">
      <div className="icons-block" onClick={() => navigate('/')} >
        <img className="nisum-image" src="../../nisum.jpeg" alt="nisum-logo" />
      </div>
      <div className="account-container">
        <div className="account-avatar" onClick={avatarClick} >
          <img className="avatar" src="../../user.png" alt="account-avatar" />
          <p className="user-name">{user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
