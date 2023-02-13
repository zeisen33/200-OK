import LoginFormPage from "./components/LoginFormPage/LoginForm";
import { Route, Switch } from 'react-router-dom' 
import React from 'react'
import NavBar from './components/NavBar/NavBar.js'
import SignupFormPage from './components/SignupFormPage/SignupForm'

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <NavBar />
        <LoginFormPage />
      </Route>
      <Route path='/'>
        <NavBar />
      </Route>
      <Route path='/signup' >
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
