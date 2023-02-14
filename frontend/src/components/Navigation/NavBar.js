import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { Redirect } from 'react-router-dom'
import './NavBar.css'
import { Link } from 'react-router-dom'
import ErrorLogo from "../../assets/Exclam.png"
import WellfoundLogo from "../../assets/Wellfound.png"
import LinkedInLogo from "../../assets/LinkedInLogo.png"
import GitHubLogo from "../../assets/GitHubLogo.png"
import { BrowserRouter, Route } from "react-router-dom" 
import { NavLink } from 'react-router-dom'


const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [searchStr, setSearchstr] = useState()

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchstr(e.target.value)
    }

return (
    <div id='OuterContainer' >
        <h1 className='NavBarItem' id="NavBarContainer200">
            <Link to='/' id='NavBarLogo200'>200 OK</Link>
        </h1>
        <div id='GitLinkContainer' className='NavBarItem' >
            <Link id='GitLink' to='https://github.com/zeisen33/Stack-Overflow'>Site GitHub Repo</Link>
        </div>
        <div id='SearchContainer' className='NavBarItem'>
            <input id='NavSearchBar' type='text' placeholder='Search...' value={searchStr} onChange={handleSearchChange} />
        </div>
    </div>




    )
}

export default NavBar