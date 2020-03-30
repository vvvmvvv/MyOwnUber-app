import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
const API_URL = 'http://localhost:8081';
const LOGIN_API = `${API_URL}/api/user/login`;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    
    const fetchLogin = async (e) => {
        e.preventDefault();
        const token = await axios.post(LOGIN_API, {email, password})
        .then(
            (user) => {
                console.log(user);
            }  
        );
        localStorage.setItem('token', token.data);
        setRouteRedirect(true);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setRouteRedirect(!!token);
    },[]);

    
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
        <div className="container">
        <h1> LOGIN: </h1>
        <form onSubmit={fetchLogin}>
            <span>Enter email: </span><input type="email" minLength="6" className="normalizeInput" name="email" value={email} onChange={handleEmailInput} required /><br/>
            <br/>
            <span>Enter password: </span><input type="password" minLength="6" className="normalizeInput" name="password" value={password} onChange={handlePasswordInput} required/>
            <br/>
            <button type="submit" className="btn btn-primary">Login</button><br/>
            <hr/>
            
            <span>If you dont`t have an account, you can register!<Link to="/register">Register</Link> </span><br/>
            <Link to="/"> Back to Home </Link>
        </form>
        </div>
        </>
    );
}