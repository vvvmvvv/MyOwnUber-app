import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


const Routes = () => (
    <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Main} />

    </Switch>
);

export default Routes;