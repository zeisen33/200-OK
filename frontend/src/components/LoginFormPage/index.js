import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import { Link } from 'react-router-dom'
import ErrorLogo from "../../assets/Exclam.png"
import WellfoundLogo from "../../assets/Wellfound.png"
import LinkedInLogo from "../../assets/LinkedInLogo.png"
import GitHubLogo from "../../assets/GitHubLogo.png"
import { BrowserRouter, Route } from "react-router-dom"


const LoginFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' />

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(e.currentTarget.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.loginUser({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    // clone lets you read response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text() // hits if server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const LoginInput = () => {
        return (
            <input className="LoginInput" id="EmailInput"
            type="text" value={email} onChange={handleEmail}
            ></input>
        )
    }

    const ErrorsLoginInput = () => {
        return (
            <div id='ErrorsPasswordContainer'>
            <input name='password' id='ErrorsEmailInput' className='ErrorsLoginInput'
            type="password" value={password} onChange={handlePassword}
            ></input>
            <img className='ErrorImg' src={ErrorLogo}></img>
            </div>
        )
    }

    const PasswordInput = () => {
        return (
            <input name='password' id='PasswordInput' className='LoginInput'
            type="password" value={password} onChange={handlePassword}
            ></input>
        )
    }

    const ErrorsPasswordInput = () => {
        return (
            <div id='ErrorsPasswordContainer'>
            <input name='password' id='ErrorsPasswordInput' className='ErrorsLoginInput'
            type="password" value={password} onChange={handlePassword}
            ></input>
            <img className='ErrorImg' src={ErrorLogo}></img>
            </div>
        )
    }

    return (
        <div id='LoginWindow'>
        <div className='ColumnContainer'>
            <h1 id="Container200">
                <Link to='/' id='Logo200'>200 OK</Link>
            </h1>
            <div id='ButtonsContainer'>
                <a href='https://angel.co/' className="Buttons" id ='LinkedIn'>
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
            <div id='FormContainer' >
                <form onSubmit={handleSubmit} className='LoginForm'>
                    <div id='EmailContainer'>
                    <label for='EmailInput' id='EmailLabel'>Email
                    </label>
                    
                        {errors.length > 0 ? ErrorsLoginInput() : LoginInput()}
                    
                    </div>
                    <ul className='Error'>
                        {errors.length > 0 ? 'Invalid Credentials.' : null}
                    </ul>
                  
                    <div id='Password Container'>
                        <div id='PasswordForgotPassword'>
                        <label id='LoginPasswordLabel' for='password'>Password
                        </label>
                        <Link to='/' id='ForgotPassword'>Forgot Password?</Link>
                        </div>
                    
                            {errors.length > 0 ? ErrorsPasswordInput(): PasswordInput()}
                        
                    <ul className='Error' id='Error2'>
                        {errors.length > 0 ? 'Invalid Credentials.' : null}
                    </ul>
                    </div>
                    <br/>
                    <button className='Buttons' type="submit" id='LogInButton'>Log in</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default LoginFormPage
