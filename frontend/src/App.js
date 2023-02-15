import LoginFormPage from "./components/LoginFormPage/LoginForm";
import { Route, Switch } from 'react-router-dom' 
import React from 'react'
import NavBar from './components/Navigation/NavBar.js'
import SignupFormPage from './components/SignupFormPage/SignupForm'
import Footer from './components/Footer/Footer.js'
import Splash from './components/Splash/Splash.js'

function App() {
  return (
    <>
    <Switch>
      <Route path='/login'>
        <NavBar />
        <LoginFormPage />
      </Route>
      <Route exact path='/'>
        <Splash />
      </Route>
      <Route path='/signup' >
        <NavBar />
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
