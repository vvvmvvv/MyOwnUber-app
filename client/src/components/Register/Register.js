import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:8081';
const REGISTER_API = `${API_URL}/api/user/register`;

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    
    const fetchRegistry = async (e) => {
        e.preventDefault();
        await axios.post(REGISTER_API, {name,email, password, role});
        alert("Successfully registered! Go to LOGIN!");
    }
    
    const handleNameInput = (e) => {
        setName(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleRadioShipper = (e) => {
        setRole(e.target.value);
    }

    const handleRadioDriver = (e) => {
        setRole(e.target.value);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setRouteRedirect(!!token);
    },[]);

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    return (
        <>
        <div className="container">
        <h1>Register:</h1>
        <div className="jumbotron">
        <form onSubmit={fetchRegistry}>
            <span>Name: </span><input type="text"  minLength="6" name="name" className="form-control-8" value={name} onChange={handleNameInput} required />&nbsp;&nbsp;
            <span>Email: </span><input type="email" minLength="6" name="email" className="form-control-8" value={email} onChange={handleEmailInput} required/>&nbsp;&nbsp;
            <span>Enter  Password: </span><input type="password" minLength="6" name="password" className="form-control-20" value={password} onChange={handlePasswordInput} required /><br/>
            <br/>
            <h4>You are: </h4>
            <input type="radio" id="driver" name="role" value="driver" onChange={handleRadioDriver}/>
            &nbsp;<label htmlFor="driver">Driver</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" id="shipper" name="role" value="shipper"onChange={handleRadioShipper} />
            &nbsp;<label htmlFor="shipper">Shipper</label>
            <br/>
            <br/>
            <button type="submit" className="btn btn-primary">Register</button><br/>
            <hr/>
            <span>Maybe, you already have an  account?<Link to="/login">Login</Link> </span><br/>
            <Link to="/"> Back to Home </Link>
        </form>
        </div>
        </div>
        </>
    );
}