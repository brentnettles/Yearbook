import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useUserContext } from './CreateUserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    useEffect(() => {
        // Redirect if already logged in
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

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
                Cookie.set('user', JSON.stringify(userData.user), { expires: 1 });
                setUser(userData.user);
                setMsg('Login successful');
                setError('');
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
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn login-btn">Login</button>
            {error && <p className="error-message">{error}</p>}
            {msg && <p className="success-message">{msg}</p>}
        </form>
    );
};

export default Login;
