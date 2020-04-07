import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'

const Login = (props) => {
  const { login, isAuthencated, error, clearErrors } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthencated) {
      props.history.push('/');
      clearErrors();
    } else {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthencated, props.history])
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;

  const onchange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    if (error !== null) { clearErrors() }
  }
  const onsubmit = (e) => {
    e.preventDefault();
    login({email,password});
    clearErrors();
  }
  return (
    <>
    <div className="container">
    <div className="jumbotron">
    <h1>Login</h1>
      <form onSubmit={onsubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" value={email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" value={password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="question-error">
                {error !== null && <button className="btn btn-danger" type="button">{error} <span onClick={() => clearErrors()}>X</span></button>}
          </div>
                <p>Dont' have an account? {" "} <Link to='/register'>Sign Up</Link></p>
              
          <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  </div>
</>
  )
}
export default Login;
