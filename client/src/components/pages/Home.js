import React, { useContext, useEffect } from 'react';
import LoadForm from '../loads/LoadForm';
import SearchLoad from '../loads/SearchLoad';
import LoadsList from '../loads/LoadsList';
import AuthContext from '../../context/authContext/authContext';

import TruckContext from '../../context/truckContext/truckContext';
import LoadContext from '../../context/loadContext/loadContext';

const Load = () => {
  return(
    <>
    <h1>SHIPPER`S MENU </h1>
    <h3>working with load</h3>
    <div className="filter">
          <SearchLoad />
    </div>
        <LoadForm />
        <hr/>
        <LoadsList />
    </>
  )
}

const Truck = () => {
  return(
    <>
    <h1>TRUCK`S MENU</h1>
    <h3>working with truck</h3>
    </>
  )
}


const Home = () => {
  const { loadUser, user } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      <div className="jumbotron">

        {user && user.role === "DRIVER" ? <p>DRIVER MENU</p> : <Load/> }

      </div>
    </div>
  )
}
export default Home;
