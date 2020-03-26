import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'


export default function Main() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthorized(false);
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthorized(!!token);
    },[]);

    return (
        <>
        <div className="container">
        <h1> My UBER app  </h1>
        {isAuthorized
            ? (
                <>
                    <button type="button" className="btn btn-info" onClick={handleLogout}>LOGOUT</button>
                    <h2>Main menu</h2>
                </>
            ) : (
                <>
                
                    <Link className="btn btn-primary" to="/login"> LOGIN</Link>
                    <hr/>
                    <br/>
                    <Link className="btn btn-secondary" to="/register"> REGISTER</Link>
                    <h2>Main menu</h2>
                </>
            )} 
            </div>
        </>
    );
}