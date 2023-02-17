import "./QuestionsShow.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import * as questionActions from '../../store/questions.js'
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const QuestionsShow = () => {
    const dispatch = useDispatch()
    const { questionId } = useParams() 
    const question = useSelector(questionActions.getQuestion(questionId))
    // const question = questionActions.fetchQuestion(questionId)
    // debugger
    useEffect(() => {
        if (questionId) {
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [dispatch, questionId])    
    // debugger
    if (question) {
        return (
            <div className="ShowQuestionContainer">
                <h1>Hello From QusetionShow {question.title}</h1>
                <h3>asked by {question.asker}</h3>
                <p>{question.body}</p>
            </div>
        )
    } else {
        return <h1>No Question</h1>
    }


}

export default QuestionsShow