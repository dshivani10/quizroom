import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import '../../css/Login.css';

function LoginPage() {
    function userLogged(res){
        const credentials = jwt_decode(res.credential);
        const {email, exp, name, iat, picture, sub} = credentials;
        localStorage.setItem('user',JSON.stringify({email, exp, name, iat, picture, sub}))
    }
    useEffect(() => {
        /* google global */
        google.accounts.id.initialize({
            client_id: "612323613881-u5oq416hbs8eig61gvu1j8ismlitmtfs.apps.googleusercontent.com",
            callback: userLogged
        });
        google.accounts.id.renderButton(
            document.getElementById("loginDiv"),
            { theme: "outline", size: "large"}
        );
    },[])
    return (
        <div>
        <p>Login page</p>
        <div id='loginDiv'></div>
        </div>
    );
}

export default LoginPage;