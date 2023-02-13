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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.signup({ email, displayName, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
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
                <label id='label'>
                  Display Name
                  <br/>
                  <input className='input'
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label >
              </div>
              <div className='InputContainer' id='ContainerEmail'>
              <label id='label'>
                Email
                <br/>
                <input className='input'
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              </div>
              <div className='InputContainer' id='ContainerPassword'>
              <label id='label'>
                Password
                <br/>
                <input className='input'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              </div>
              <br/>
              <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default SignupFormPage;