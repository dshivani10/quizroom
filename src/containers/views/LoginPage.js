/*global google*/
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import '../../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setUser,
} from '../../redux/actions/quizActions';
import AppConstants from '../../configs/constants';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function getUser(id) {
        const response = await axios.get(`${AppConstants.API_ENDPOINT}/api/login/${id}`);
        const user = response.data;
        user.logged = true;
        localStorage.setItem('user',JSON.stringify(user));
        dispatch(setUser(user));
        navigate('/')
    }
    function userLogged(res){
        const credentials = jwt_decode(res.credential);
        const {sub} = credentials;
        getUser(sub);
    }
    useEffect(() => {
        google.accounts.id.initialize({ // eslint-disable
            client_id: "612323613881-u5oq416hbs8eig61gvu1j8ismlitmtfs.apps.googleusercontent.com",
            callback: userLogged
        });
        google.accounts.id.renderButton( // eslint-disable
            document.getElementById("loginDiv"),
            { theme: "outline", size: "large", text: "signin_with"}
        );
    },[])
    return (
        <div className="login-container">
            <div className="sign-in-box">
                <p className="sign-in-title">Sign in</p>
                <div id='loginDiv'></div>
                <p className="sign-in-content">
                    By signing in or creating an account, you agree to Conditions of Use and Privacy Policy of Nisum's QuizRoom.
                </p>
            </div>
            <div>
                <div className="create-account-title">
                    <hr className="line-divider"></hr>
                    <span className="line-divider-text">New to Nisum's QuizRoom ?</span>
                </div>
                <Button className="create-account" onClick={() => navigate('/app/registration')} type="primary">Create Account</Button>
            </div>
        </div>
    );
}

export default LoginPage;