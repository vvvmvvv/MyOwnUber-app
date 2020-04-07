import React, { Fragment, useContext,useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext'
//import TruckContext from '../../context/truckContext/truckContext'
import LoadContext from '../../context/loadContext/loadContext'

const Navbar = ({ title, icon }) => {
  const { user, logout, isAuthencated} = useContext(AuthContext);
  const {clearLoads} = useContext(LoadContext);

  const onLogout = () => {
    logout();
    // clearLoads();
  };
  
  const authLinks = (
    <Fragment>
      {user && <Link to={`/user/${user._id}`}>{user && user.role}: {user && user.name}</Link>}&nbsp;&nbsp;
      <Link className="btn btn-primary" to='/' onClick={onLogout}><span className="sm-hide">Logout</span> <i className="fas fa-sign-out-alt"></i></Link>
    </Fragment>
  );

  const guestLinks = (
    <>
        <Link className="btn btn-primary" to='/register'>Register</Link>&nbsp;&nbsp;
        <Link className="btn btn-secondary" to='/login'>Login</Link>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link to="/" className="nav-link"><i className={icon} /> {title}</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">About</Link>
      </li>
    </ul>
    {isAuthencated ? authLinks : guestLinks}
  </div>
</nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'VM-Taxi',
  icon: 'fas fa-taxi'
}

export default Navbar

