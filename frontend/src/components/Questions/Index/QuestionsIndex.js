import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as questionActions from '../../../store/questions.js'
import * as userActions from '../../../store/users'

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
            <div key={question.id} >
                <ul>
                    <li>
                        <h1>
                            <Link to={`/questions/${question.id}`}>{question.title}</Link>
                        </h1>
                    </li>
                    <li>
                        Asked by: {users[question.askerId].displayName}
                    </li>
                </ul>
            </div>
        )
    })

    // debugger

    return (
        <>
            <h1>Questions</h1>
            {questionsList}
        </>
    )
}

export default QuestionsIndex