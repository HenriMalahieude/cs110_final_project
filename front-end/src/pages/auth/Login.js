import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

const Login = ({ setToken, username, setUsername }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            setToken(response.data.token);
            setMessage('Login successful!');
            setError('');
        } catch (error) {
            console.log(error);
            setError(error.response.data.error || 'Login failed. Please try again.');
            setMessage('');
        }
    };

    const googleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div>
            <h3>Login</h3>
            <div className="login-section">
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button onClick={googleLogin}>Login with Google</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default Login;
