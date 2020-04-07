import React, { useState, useContext, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';



const Profile = (props) => {

  const { user, loadUser, updateProfile, deleteShipper } = useContext(AuthContext);
  const [routeRedirect, setRouteRedirect] = useState(false);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   if (!isAuthencated || !user) {
  //     props.history.push('/');
  //     setRouteRedirect(true);
  //   }
  //   // eslint-disable-next-line
  // }, [isAuthencated, props.history])

  const [updUser, setUpdUser] = useState({name: '',password: ''});


 const { name, password, password2 } = user;

  const onchange = e => {
    setUpdUser({
      ...updUser,
      [e.target.name]: e.target.value
})
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (user.password === user.password2) {
        updateProfile({updUser});
      }
  };

  const deleteUser = async (e,id) =>{
    e.preventDefault();
    console.log(id);
    deleteShipper(id);
}

const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/login' />
  }

  return (
    <>
    <div className="container">
     
    <h1>My Profile:</h1>
    <hr/>
    <h3>Name: {user.name}</h3>
    <h3>Email: {user.email}</h3>
    <div className="jumbotron">
    <form onSubmit={onsubmit}>
        <hr/>
            <h3>Update Profile Info:</h3>
            <div className="form-group">
            <label htmlFor="exampleInputName">Enter new name:</label>
                <input type="text" name="name" placeholder="Enter name" value={name} onChange={onchange} className="form-control" id="exampleInputName"  required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Enter new password:</label>
                <input type="password" name="password" value={password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Enter password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm new password:</label>
                <input type="password" name="password2" placeholder="Enter confirmed password" className="form-control" id="exampleInputPassword2" value={password2} onChange={onchange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            {user.role === "SHIPPER" && <button onClick={(e) => deleteUser(e, user._id)} className="btn btn-danger">Delete Account</button> }
            </div>
            </>
  )
}
export default Profile;
