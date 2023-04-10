import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { Redirect, Link, BrowserRouter, Route } from 'react-router-dom'
import './NavBar.css'
import ErrorLogo from "../../assets/Exclam.png"
import WellfoundLogo from "../../assets/Wellfound.png"
import LinkedInLogo from "../../assets/LinkedInLogo.png"
import GitHubLogo from "../../assets/GitHubLogo.png"
import { NavLink } from 'react-router-dom'


const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [searchStr, setSearchstr] = useState()
    const dispatch = useDispatch()

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchstr(e.target.value)
    }

    const handleLogout = async () => {
        await dispatch(sessionActions.logoutUser(sessionUser.id))
        window.location.reload()
    }

    const handleLogin = () => {
        window.location.href='/login'
    }

    const handleSignUp = () => {
        window.location.href='/signup'
    }

    const loginout = () => {
        if (sessionUser) {
            return (
                <> 
                <div id='RightButtonsContainerLoggedIn'>
                    <div id='RightButtonLinkedInContainer'>
                        <a href='https://www.linkedin.com/in/zane-eisen-121856bb/' className="RightButton" id ='LinkedInRight'>
                            <img src={LinkedInLogo} className='logos'></img><span id='MyLinkedIn'>My LinkedIn</span>
                        </a>
                    </div>
                    <button className='RightButton' id='NavLogoutButton' onClick={handleLogout}>Log out</button>
                </div> 
                </>
            )
        } else {
            return (
                <>
                    <div id='RightButtonsContainer'>
                    <div><button onClick={handleLogin} className='RightButton' id='NavLoginButton'>Log in</button></div>
                    <div><button onClick={handleSignUp} className='RightButton' id='NavSignUpButton'>Sign up</button></div>
                    </div>
                </>
            )
        }
    }


return (
    <div id='OuterContainer' >
        <h1 className='NavBarItem' id="NavBarContainer200">
            <Link to='/' id='NavBarLogo200'>200 OK</Link>
        </h1>
        <div id='GitLinkContainer' className='NavBarItem' >
            <a href='https://github.com/zeisen33/Stack-Overflow' id='GitLink'>Site GitHub Repo</a>
        </div>
        <div id='SearchContainer' className='NavBarItem'>
            <input id='NavSearchBar' type='text' placeholder='Search...' value={searchStr} onChange={handleSearchChange} />
        </div>
        <div id='loginoutsignupContainer'>{loginout()}</div>
    </div>




    )
}

export default NavBar