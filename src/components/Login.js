import {Helmet} from "react-helmet";
import './css/signupin.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ axiosInstance }) {

    let [password, setPassword] = useState('');
    let [username, setUsername] = useState('');
    let [loginFail, setLoginFail] = useState(false);

    const navigate = useNavigate();

    const login = (axiosInstance) => {
        axiosInstance.post('/user/login', {
            "username": username,
            "password": password
        }).then(function (response) {
            console.log(response);
            if(response.status === 200 && response.data.message === "Login successful.") {
                navigate('/employeelist');
            }  
        }).catch(error => {
            console.error('Error:', error);
            setLoginFail(true);
        });
    };

    return (
        <div className="App">
            <Helmet>
                <title>Login</title>
            </Helmet>
            
            <main className="signupin">
                <h1>Sign In</h1>
                <form className="signup-form" onSubmit={(e) => {
                        e.preventDefault();
                        login(axiosInstance)
                    }}>

                    <div>
                        <label>UserName</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>

                    <button type="submit" className="signup-btn">Login</button>
                    <br />
                    <p style={{textAlign: 'center'}}>No account? <a href="/signup"> Signup Now</a></p>
                    <br />
                    <br />
                    {loginFail ? ( <p style={{color: 'red'}}>Invalid Username/Password</p>
                    ) : (<></>)}
                </form>
            </main>
        </div>
    );
}