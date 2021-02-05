import React from 'react';
import Posts from '../Posts/Posts';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import CreateProfile from '../Profile/CreateProfile/CreateProfile';
import ViewProfile from '../Profile/ViewProfile';
import Loader from '../Loader/Loader'
import { Switch,Route } from 'react-router';

const Home=(props)=>{
    return (
        <>
        <Switch>
            <Route path="/createProfile" component={CreateProfile} exact />
            <Route path="/" component={Posts} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/viewProfile/:id" component={ViewProfile} exact />
        </Switch>
        </>
    );
}

export default Home;