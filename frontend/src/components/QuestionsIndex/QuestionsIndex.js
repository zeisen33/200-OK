import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as questionActions from '../../store/questions.js'
import { Link } from "react-router-dom"

const QuestionsIndex = () => {
    const dispatch = useDispatch()
    // debugger
    useEffect(() => {
        dispatch(questionActions.fetchAllQuestions())
    }, [dispatch])

    const questions = useSelector(questionActions.getQuestions)
    // debugger

    // const handleClick - go to show

    const questionsList = questions.map((question) => {    
        return (
            <div key={question.id} >
                <ul>
                    <li>
                        <h1>
                            <Link to={`questions/${question.id}`}>{question.title}</Link>
                        </h1>
                    </li>
                    <li>
                        Asked by: {question.asker}
                    </li>
                </ul>
            </div>
        )
    })

    // debugger

    if (questions.length === 0) {
        return <h1>Hello From No Questions</h1>
    } else {
        return (
            <>
                <h1>Questions</h1>
                {questionsList}
            </>
        )
    }
}





export default QuestionsIndex