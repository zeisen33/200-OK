import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import './LoginForm.css'
import { Link } from 'react-router-dom'
import logo from"../../assets/Exclam.png"


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
            <input className="ErrorsLoginInput" id="ErrorsEmailInput"
            type="text" value={email} onChange={handleEmail}
            ></input>
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
            <img className='ErrorImg' src={logo}></img>
            </div>
        )
    }


    return (
        <div id='LoginWindow'>
        <div className='ColumnContainer'>
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







{/* <div className='DisplayBoxes'>
            <div className='LoginBox'>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label id='LoginEmailLabel'>Email
                        <br />
                        <input
                            type="text" value={email} onChange={handleEmail}
                        ></input>
                    </label>
                    <br>
                    </br>
                    <label id='LoginPasswordLabel'>Password
                    <Link to='/' id='ForgotPassword'>Forgot Password?</Link>
                        <br/> 
                        <input
                            type="password" value={password} onChange={handlePassword}
                        ></input>
                    </label>
                    <br/>
                    <button type="submit" id='LogInButton'>Log in</button>
                </form>
            </div>
        </div>
        <div>Don't have an account?</div><Link to='/' id='SignUp'>Sign up</Link> */}