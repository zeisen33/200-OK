import "./QuestionsShow.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import * as questionActions from '../../store/questions.js'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as userActions from '../../store/users'

const QuestionsShow = () => {
    const dispatch = useDispatch()
    const { questionId } = useParams() 
    let question = useSelector(questionActions.getQuestion(questionId))
    const user = useSelector(userActions.getUser(question.askerId))
    // allows navigation to show page from Index but not directly from URL
    // since direct from URL doesn't save the question in state

    // debugger
    useEffect(() => {
        if (questionId) {
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [dispatch, questionId])    
    // debugger
    if (question && user) {
        return (
            <div className="ShowQuestionContainer">
                <h1>Hello From QusetionShow {question.title}</h1>
                <h3>asked by {user.displayName}</h3>
                <p>{question.body}</p>
            </div>
        )
    } else {
        return <h1>No Question</h1>
    }


}

export default QuestionsShow