import LoginFormPage from "./components/LoginFormPage/LoginForm";
import { Route, Switch } from 'react-router-dom' 
import React from 'react'
import NavBar from './components/Navigation/NavBar.js'
import SignupFormPage from './components/SignupFormPage/SignupForm'
import Splash from './components/Splash/Splash.js'
import QuestionsIndex from './components/Questions/Index/QuestionsIndex.js'
import QuestionsShow from './components/Questions/Show/QuestionsShow'
import QuestionsCreate from './components/Questions/Create/Create'
import QuestionsUpdate from "./components/Questions/Update/QuestionsUpdate";
import Footer from "./components/Footer/Footer";

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
        <QuestionsCreate wizard={true} />
      </Route>
      <Route exact path = '/questions/:questionId'>
        <QuestionsShow />
      </Route>
      <Route path='/signup' >
        <SignupFormPage />
      </Route>
      <Route path='/questions/:questionId/edit' >
        <QuestionsUpdate />
      </Route>
    </Switch>
    <Footer />
    </>
  );
}

export default App;
