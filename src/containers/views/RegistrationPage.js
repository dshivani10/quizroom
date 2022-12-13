/* google global */
import React, { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import '../../css/Login.css';
import { useNavigate } from 'react-router-dom';
import AppConstants from '../../configs/constants';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';

function RegistrationPage() {
    const navigate = useNavigate();
    async function userLogged(res){
        const credentials = jwt_decode(res.credential);
        const {email, name, picture, sub} = credentials;
        await axios.post(`${AppConstants.API_ENDPOINT}/api/register/user`, {email, name, picture, google_id:sub}).then(()=>{
            navigate('/app/login');
        });
    }
    useEffect(() => {
        google.accounts.id.initialize({ // eslint-disable
            client_id: "612323613881-u5oq416hbs8eig61gvu1j8ismlitmtfs.apps.googleusercontent.com",
            callback: userLogged
        });
        google.accounts.id.renderButton( // eslint-disable
            document.getElementById("registrationDiv"),
            { theme: "outline", size: "large", text: "signup_with"}
        );
    },[])
    return (
        <div className="login-container">
            <div className="sign-in-box">
                <p className="sign-in-title">Create Account</p>
                <div id='registrationDiv'></div>
                <p className="sign-in-content">
                    By creating an account or signing in, you agree to Conditions of Use and Privacy Policy of Nisum's QuizRoom.
                </p>
            </div>
            <div>
                <div className="create-account-title">
                    <hr className="line-divider"></hr>
                    <span className="line-divider-text">Already have an account ?</span>
                </div>
                <Button className="create-account" onClick={() => navigate('/app/login')} type="primary">Sign in</Button>
            </div>
        </div>
    );
}

export default RegistrationPage;