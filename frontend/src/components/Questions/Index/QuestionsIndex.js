import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as questionActions from '../../../store/questions.js'
import * as userActions from '../../../store/users'
import './QuestionsIndex.css'

const QuestionsIndex = () => {
    const dispatch = useDispatch()
    const questions = useSelector(questionActions.getQuestions)
    const users = useSelector(userActions.getUsers)
    // debugger

    // debugger
    useEffect(() => {
        // debugger
        dispatch(questionActions.fetchAllQuestions())
    }, [dispatch])

    // debugger

    // const handleClick - go to show

    const questionsList = questions.map((question) => {    
        return (
            <section>
                <div key={question.id} >
                    <ul id='sectionContentContainer'>
                        <li id='TitleContainer'>
                            <h1 className='QTitle'>
                                <Link to={`/questions/${question.id}`}>{question.title}</Link>
                            </h1>
                        </li>
                        <div id='askedByContainer'>
                            <li className='askedBy'>
                                Asked by: {users[question.askerId].displayName}
                            </li>
                        </div>
                    </ul>
                </div>
            </section>
            
        )
    })

    // debugger

    
    return (
        <div id='OuterQIndexContainer'>
            <div id='TopSec'>
                <div id='TopQsContainer'>
                    <h1 id='TopQs'>Top Questions</h1>
                </div>
                <div id='NewQContainer'>
                    <Link id='AskButton' to='/questions/new' >Ask Question</Link>
                </div>
            </div>
            {questionsList}
        </div>
    )
}

export default QuestionsIndex