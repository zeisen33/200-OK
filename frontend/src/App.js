import LoginFormPage from "./components/LoginFormPage/LoginForm";
import { Route, Switch } from 'react-router-dom' 
import React from 'react'
import NavBar from './components/Navigation/NavBar.js'
import SignupFormPage from './components/SignupFormPage/SignupForm'
import Footer from './components/Footer/Footer.js'
import Splash from './components/Splash/Splash.js'
import QuestionsIndex from './components/QuestionsIndex/QuestionsIndex.js'
import QuestionsShow from './components/QuestionsShow/QuestionsShow'
import QuestionsCreate from "./components/QuestionsCreate/QuestionsCreate";

function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route exact path='/'>
        <Splash />
      </Route>
      <Route exact path='/questions'>
        <QuestionsIndex />
      </Route>
      <Route path='/questions/new'>
        <QuestionsCreate />
      </Route>
      <Route exact path = '/questions/:id'>
        <QuestionsShow />
      </Route>
      <Route path='/signup' >
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
