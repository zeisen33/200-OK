import LoginFormPage from "./components/LoginFormPage/LoginForm";
import { Route, Switch } from 'react-router-dom' 
import React from 'react'
import NavBar from './components/Navigation/NavBar.js'
import SignupFormPage from './components/SignupFormPage/SignupForm'

function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route exact path='/'>
      </Route>
      <Route path='/signup' >
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
