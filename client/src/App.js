import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';


import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

import LoadState from './context/loadContext/LoadState';
import AuthState from './context/authContext/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <LoadState>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/user/:id' component={Profile} />
            </Switch>
          </div>
        </Router>
      </LoadState>
    </AuthState>
  );
}

export default App;
