import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:5555/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
          });

            if (!response.ok) {
                const errorData = await response.json();
                setError('Login failed: ' + (errorData.error || 'User not found'));
                setMsg('');
            } else {
                const userData = await response.json();
                setMsg('Login successful');
                setError('');
                console.log(`You are logged in as: ${userData.user.name}`);
                navigate('/'); 
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            setMsg('');
            return;
        }
        handleLogin();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
            {msg && <p>{msg}</p>}
        </form>
    );
};

export default Login;
