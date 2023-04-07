import "./Splash.css"
import SearchIcon from '../../assets/SearchIcon.png'
import { Link } from "react-router-dom"
import Footer from "../Footer/Footer.js"

const Splash = () => {
    return (
    <div id='wholeWindow'>
        <div id='ContentContainerSplash'>
            <div id='BlackBackground'>
                <div id='BubbleContainer'>
                    <div className='SplashBubble' id='leftBubble'>
                        <img className='leftBubbleItem' id='SearchIcon' src={SearchIcon}></img>
                        <span className='leftBubbleItem' id='Item2'>Find the best answer to your technical question, help others answer theirs</span>
                        <Link className='leftBubbleItem' id='JoinButton' to='/signup'><span id='JoinSpan'>Join the community</span></Link>
                    <div className='leftBubbleItem' id='orDiv'>or <Link to='/questions' id='searchLink'>search content</Link></div>
                    </div>
                    <div className='SplashBubble' id='rightBubble'>
                        <span id='questionIcon' className='rightBubbleItem'>?</span>
                        <span id='have?' className='rightBubbleItem'>Have a coding question?</span>
                        <Link className='rightBubbleItem' to='/questions/new' id='QuestionButton'><span id='questionLink'>Ask a Question</span></Link>
                    </div>
                </div>
                <div id='TextContainer'>
                    <h1 id='bigText'>Everything is going to be</h1>
                    <h1 id='logo200ok'>200 OK</h1>
                </div>
                <div id='SubtitleContainer'>
                    <div className='Subtitle'>
                        <span className='largeWhite'>Search</span>
                        <span className='smallGrey'>people's questions</span>
                    </div>
                    <div className='Subtitle'>
                        <Link to='/questions/new' >
                            <span id='Ask' className='largeWhite'>Ask</span>
                                <span className='smallGrey'>a question</span>
                        </Link>
                    </div>
                    <div className='Subtitle'>
                    <span className='largeWhite'>Answer</span>
                        <span className='smallGrey'>others' questions</span>
                    </div>
                    <div className='Subtitle'>
                    <span className='largeWhite'>Vote</span>
                        <span className='smallGrey'>for good answers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Splash