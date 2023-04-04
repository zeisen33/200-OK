import "./QuestionsShow.css"
import { Redirect, useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import * as questionActions from '../../store/questions.js'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as userActions from '../../store/users'
import QuestionsUpdate from "../QuestionsUpdate/QuestionsUpdate"

const QuestionsShow = () => {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    // debugger 
    let question = useSelector(questionActions.getQuestion(questionId))
    // debugger
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    // debugger
    const currentUserId = useSelector(userActions.getCurrentUserId)
    // debugger
    
    
    useEffect(() => {
        // debugger
        if (questionId) {
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [questionId])


    const updateButton = () => {
        // debugger
        if (currentUserId === question.askerId) {
            // debugger
            return <Link to={`/questions/${questionId}/edit`}>Edit Question</Link>
        }
    }
    
    // debugger                            
    if (question && asker) {
        return (
            <div className="ShowQuestionContainer">
                <h1>{question.title}</h1>
                <h3>asked by {asker.displayName}</h3>
                <p>{question.body}</p>
                {updateButton()}
            </div>
        )
    } else {
        return null
    }
}

export default QuestionsShow