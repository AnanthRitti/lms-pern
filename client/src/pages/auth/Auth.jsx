import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function Auth(){

    const [cookie, setCookie, removeCookie] = useCookies(null);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3000/login", {
                Username: username,
                Password: password
            });
    
            const data = response.data;
            console.log(response.data);
    
            if (data.detail) {
                setError(data.detail);
            } else {
                setCookie('user_type', data.Type);
                setCookie('authToken', data.token);
                setCookie('userId', data.userId);
    
                console.log(data);
    
                if (data.Type === "admin") {
                    console.log("Redirecting to /");
                    navigateTo("/");
                } else if (data.Type === "teacher") {
                    console.log("Redirecting to /teacher");
                    navigateTo("/teacher/home/");
                } else if (data.Type === "student") {
                    console.log("Redirecting to /student");
                    navigateTo("/student/home/");
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    }
    
    return (
        <div>
            <div className="login-page">
                <h1>
                    Welcome to the <br/>
                    GJC-Harpanahalli LMS
                </h1>
                <div className="login-box">
                    <div className="inputs">
                        <p>Welcome Back!</p>
                        <input type="text" placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={(e) => handleSubmit(e)}>Login</button>
                    </div>
                    {error && <div className="error"  style={{textAlign:"center"}}>{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default Auth;
