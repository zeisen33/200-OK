import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
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
  
  const handleDemo = async (e) => {
    e.preventDefault()
    // debugger
    await dispatch(sessionActions.loginUser({email: 'demo@user.io', password: 'password'}));
    // window.location.replace("/");
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
                <label id='displaylabel' htmlFor='displayinput'>
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
              <button id='signupButton' type="submit">Sign Up</button>
              <button id='signupButton' type='submit' onClick={handleDemo}>Sign in as Demo User</button>
              <div id='spancontainer'>
              <span id='byclicking'>By clicking “Sign up”, you agree to our </span><span className='blue'>terms of service, privacy policy</span> and <span className='blue'>cookie policy.</span>             
              </div>
            </form>
            
            </div>
            <div id='TextContainerSignup'>
            <span id='NoAccountSignup' >Already have an account? <a href='/login' className="blue" id='loginlink'>Log in</a></span>
            <br/>
            <p id="TextParagraph">Are you a recruiter? Check out my links!
                <a className='parLinks' href='https://www.linkedin.com/in/zane-eisen-121856bb/'>My LinkedIn</a>
                <a className='parLinks' href='https://github.com/zeisen33'>My GitHub</a>
                <a className='parLinks' href='https://angel.co/'>My Wellfound</a>
            </p>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default SignupFormPage;