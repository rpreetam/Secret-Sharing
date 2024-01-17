import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import SecretState from './context-secrets/SecretState';
import UserState from "./context-user/UserState";
import AlertState from "./context-alert/AlertState";
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
//import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
   <AlertState>
    <UserState>
    <SecretState>
      <Router>
        <Navbar/>
        <Alert />
        <div className="container">
          <Switch>
            <Route exact  path="/">
              <Home/>
            </Route>
            <Route  path= "/login" >
              <Login/>
            </Route>
            <Route  path="/signup">
              <Signup  />
            </Route>
          </Switch>

        </div>
      </Router> 
    </SecretState>
    </UserState>
    </AlertState>
    </>
  );
}

export default App;