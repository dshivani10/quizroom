import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import '../../css/ProfilePage.css';
import {
  setUser,
} from '../../redux/actions/quizActions';

function ProfilePage() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function signout(){
        localStorage.removeItem('user')
        dispatch(setUser({
            email: '',
            google_id: '',
            name: 'Hello, Sign in',
            picture: '',
            role: '',
            logged: false
        }));
        navigate('/')
    }
    return (
        <div className="profile-page-container">
            <div>
                <img className="profile-image" src={user.picture}></img>
                <p className="profile-name">{user.name}</p>
            </div>
            <div className="sign-out-div">
                <Button className="sign-out-button" onClick={signout} type="primary">Sign Out</Button>
            </div>
        </div>
    );
}

export default ProfilePage;
