import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import ErrorLogo from "../../assets/Exclam.png"
import WellfoundLogo from "../../assets/Wellfound.png"
import LinkedInLogo from "../../assets/LinkedInLogo.png"
import GitHubLogo from "../../assets/GitHubLogo.png"



function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [displayErrors, setDisplayErrors] = useState([])
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])
  const [robot, setRobot] = useState()

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
      e.preventDefault();
      await setErrors([]);
      await dispatch(sessionActions.signup({ email, displayName, password }))
        .catch(async (res) => {
          // debugger
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
          // debugger
        }
        // debugger
        if (data?.errors) {
          // debugger
          setErrors(data.errors);
        } else if (data) {
          // debugger
          setErrors([data]);
        } else {
          // debugger
          setErrors([res.statusText]);
        }
        // console.log(errors)
        // debugger
        // errors.forEach((error) => {
        //   if (error.includes('Display')) {
        //     debugger
        //     setDisplayErrors(error)
        //   } else if (error.includes('Email')) {
        //     debugger
        //     setEmailErrors(error)
        //   } else if (error.includes('Password')) {
        //     debugger
        //     setPasswordErrors(error)
        //   }
        //   return null
        // })
      });
    }

    const showErrors = (inputType) => {
      // debugger
      let errorEl;
     
      errors.forEach((error) => {
        if (error.includes(inputType)) {
          // debugger
          errorEl = <ul className='Error'>{error}</ul>

        }
      })
      // debugger
      return errorEl;
    }
  



  return (
    <div id='SignupWindow'>
      <div id='ContentContainer'>
        <div id='LeftColumnContainer' >
          <h1 id='JoinTitle'>Join the 200 OK community</h1>
          <h2 className='Features'>Get unstuck – ask a question</h2>
          <h2 className='Features'>Answer questions</h2>
          <h2 className='Features'>Vote and comment on questions</h2>
          <h2 className='Features'>Search for questions</h2>
          <span id='SubText'>Collaborate and share knowledge with users for FREE. <br /><a id='linkA' className='Link' href='/'>Go to 200 OK homepage</a></span>
        </div>
        <div id='RightColumnContainer' >
          <div id='ButtonsContainer'>
            <a href='https://www.linkedin.com/in/zane-eisen-121856bb/' className="Buttons" id ='LinkedIn'>
                <img src={LinkedInLogo} className='logos'></img>
                My LinkedIn
            </a>
            <a href='https://github.com/zeisen33' className="Buttons" id='GitHub'>
                <img src={GitHubLogo} className='logos'></img>
                My GitHub
            </a>
            <a href='https://angel.co/' className="Buttons" id='Wellfound'>
                <img src={WellfoundLogo} className='logos'></img>
                My Wellfound
            </a>
          </div>

          {/* <h1 id='Title'>Create your 200 OK account. It's free and only takes a minute.</h1> */}
          <div className='SignupFormContainer'>
            <form onSubmit={handleSubmit} className='SignupForm'>
              <div className='InputContainer' id='DisplayNameContainer'>
                <label id='label' htmlFor='displayinput'>
                  Display Name
                  </label >
                  <input className='input' id='displayinput'
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <br/>
                  {showErrors('Display')}
              </div>
              <div className='InputContainer' id='ContainerEmail'>
              <label id='label' htmlFor='emailinput'>
                Email</label>
                <input className='input' id='emailinput'
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
              {showErrors('Email')}
              </div>
              <div className='InputContainer' id='ContainerPassword'>
              <label id='label' htmlFor='passwordinput'>
                Password</label>
                <input className='input' id='passwordinput'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              {showErrors('Password')}
              </div>
              <span id='SubText'>
              Passwords must contain at least six characters. At least 1 letter and 1 number are recommended.
              </span>
              <div id="CaptchaOuter">
                <div id="CaptchaInner">
                  <div id='captchaline'>
                  <input type='checkbox' id='imnotarobot' />
                  <label htmlFor='imnotarobot' id='robotLabel'>I'm not a robot</label>
                  </div>
                </div>
              </div>
              <div id="optin">
                <input type='checkbox' id='optinbox'/>
                <label htmlFor='optinbox' id='optinlabel'>Opt-in to receive occasional product updates, user research invitations, announcements, and disgests.</label>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default SignupFormPage;