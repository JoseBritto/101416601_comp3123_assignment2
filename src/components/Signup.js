import {Helmet} from "react-helmet";
import './css/signupin.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup({ axiosInstance }) {



    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [username, setUsername] = useState('');
    let [signupFail, setSignupFail] = useState(false);
    let [email, setEmail] = useState('');

    const navigate = useNavigate();

    const signup = (axiosInstance) => {

        console.log(password);
        console.log(confirmPassword);

        if(confirmPassword !== password) {
            setSignupFail(true);
            return;
        }

        axiosInstance.post('/user/signup', {
            "username": username,
            "email": email,
            "password": password
        }).then(function (response) {
            console.log(response);
            if(response.status === 201 && response.data.message === "User created successfully.") {
                navigate('/employeelist');
            }  
        }).catch(error => {
            console.error('Error:', error);
            setSignupFail(true);
          });
    };

    return (
        <div className="App">
            <Helmet>
                <title>Signup</title>
            </Helmet>
            
            <main className="signupin" >
                <h1>Sign Up</h1>
                <form className="signup-form" onSubmit={(e) => {
                        e.preventDefault();
                        signup(axiosInstance)
                    }}>
                    <div>
                        <label>UserName</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
                    </div>


                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                    </div>

                    <button type="submit" className="signup-btn">Signup</button>

                    <br />
                    <p style={{textAlign: 'center'}}>Have an account? <a href="/login"> Login Instead</a></p>
                    <br />
                    <br />
                    {signupFail ? ( <p style={{color: 'red'}}>Passwords do not match!</p>
                    ) : (<></>)}
                </form>
            </main>
        </div>
    );
}