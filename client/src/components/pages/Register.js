import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'

const Register = (props) => {
  const { register, isAuthencated, error, clearErrors, setError } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthencated) {
      props.history.push('/')
    }
  }, [isAuthencated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: ''
  })
  const { name, email, role, password, password2 } = user
  onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (error !== null) {
      clearErrors()
    }
  }
  onsubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setError('Password does not match')
    } else {
      register({
        name,
        email,
        role,
        password
      })
    }
  }
  return (

<div className="container">
<div className="jumbotron">
<h1>Sign Up</h1>
<hr/>
  <form onSubmit={onsubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputName">Email address:</label>
        <input type="email" name="email" value={email} onChange={onchange} className="form-control" id="exampleInputName"  placeholder="Enter email" />
      </div>
      <div className="form-group">
      <label htmlFor="exampleInputEmail1">Name:</label>
        <input type="text" name="name" placeholder="Enter name" value={name} onChange={onchange} className="form-control" id="exampleInputName"  required />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password:</label>
        <input type="password" name="password" value={password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Enter password" required/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword2">Confirm Password:</label>
        <input type="password" name="password2" placeholder="Enter confirmed password" className="form-control" id="exampleInputPassword2" value={password2} onChange={onchange} required />
      </div>
      <h4>You are: </h4>
        <div className="beutify-radio">
        <div><input type="radio" id="driver" name="role" value="DRIVER" onChange={onchange}/><label htmlFor="driver">Driver</label></div>
        <div><input type="radio" id="shipper" name="role" value="SHIPPER" onChange={onchange} /><label htmlFor="shipper">Shipper</label></div>
        </div>
          
      <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className="question">
        {error !== null && error.map(err => <button className="btn btn-danger" type="button"  >{err.msg} <span onClick={() => clearErrors()}>X</span></button>)}
        <p>Already have an accout? {" "} <Link to='/login'>Sign In </Link></p>
      </div>
</div>
</div>
  )
}

export default Register;
