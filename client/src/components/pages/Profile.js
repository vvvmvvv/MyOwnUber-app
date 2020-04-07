import React, { useState, useContext, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';



const Profile = (props) => {

  const { user, loadUser, updateProfile, deleteShipper } = useContext(AuthContext);
  const [routeRedirect, setRouteRedirect] = useState(false);
  const [updUser, setUpdUser] = useState({
    name: '',
    password: '',
    newPassword: '',
    newPasswordConfirmation: ''
  });

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!user) {
      return;
    }

    setUpdUser({
      ...updUser,
      name: user.name
    });
  }, [user]);

  const onchange = e => {
    setUpdUser({
      ...updUser,
      [e.target.name]: e.target.value
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (updUser.newPassword === updUser.newPasswordConfirmation) {
        updateProfile(user._id,updUser);
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

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
    <div className="container">
     
    <h1>My Profile:</h1>
    <hr/>
    <h3>Name: {user.name}</h3>
    <h3>Email: {user.email}</h3>
    <div className="jumbotron">
    <form onSubmit={onsubmit} autoComplete="off">
        <hr/>
            <h3>Update Profile Info:</h3>
            <div className="form-group">
            <label htmlFor="exampleInputName">Enter new name:</label>
                <input type="text" name="name" placeholder="Enter name" value={updUser.name} onChange={onchange} className="form-control" id="exampleInputName"  required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1"> Old password:</label>
                <input type="password" name="password" value={updUser.password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Enter password" required={updUser.newPassword} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Enter new password:</label>
                <input type="password" name="newPassword" value={updUser.newPassword} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm new password:</label>
                <input type="password" name="newPasswordConfirmation" placeholder="Enter confirmed password" className="form-control" id="exampleInputPassword2" value={updUser.newPasswordConfirmation} onChange={onchange} required={updUser.newPassword} />
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
