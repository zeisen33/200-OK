import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () =>{
    return (
        <div id='FooterOuterContainer'>
            <footer id='footer'>
                <div className='FooterLine1'>
                <Link className='FooterLine1Item' id='logo200okFooter' to='/'>200 OK</Link>
                <Link className='FooterLine1Item' id='SearchQuestions'to='/'>Search Questions</Link>
                <Link className='FooterLine1Item' id='AskQuestionFooter' to='/'>Ask a Question</Link>
                <span className='FooterLine1Item' id='Me' >Site by Zane Eisen</span>
                </div>
                <br/>
                <div className='FooterLine1'>
                <Link className='FooterLine1Item' id='GitHubFooter' to='https://github.com/zeisen33'>GitHub</Link>
                <Link className='FooterLine1Item' id='https://www.linkedin.com/in/zane-eisen-121856bb/'>LinkedIn</Link>
                <Link className='FooterLine1Item' id='GitHubFooter' to='https://angel.co/'>Wellfound</Link>
                </div>
                <br/>
                <div className='Line3'>
                <span id='tinyGreyText'>Site to be copyrighted by Zane Eisen; user contributions may eventually be licensed under CC BY-SA. rev 2023.2.15.43240</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer