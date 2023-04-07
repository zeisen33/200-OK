import "./QuestionsCreate.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as questionActions from "../../../store/questions.js"
import { Redirect, Link } from "react-router-dom"

const QuestionsCreate = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])
    const [question, setQuestion] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    
    useEffect(() => {
        // debugger
        if (question) {
            setSubmitted(true)
        }
    }, [question])
    // debugger
    const asker = useSelector((state) => state.session.user)

    if (!asker) {  
        return <Redirect to='/login'/>
    }

    if (submitted) {
        // debugger
        return <Redirect to={`/questions/${question.id}`} />
    }

        // later: add error slice of state to show that you aren't logged in

    const handleTitle = (e) => setTitle(e.target.value)
    const handleBody = (e) => setBody(e.target.value)

    const handleSubmit = async (e) => {
        // debugger
        e.preventDefault()
        await setErrors([]);
        // debugger
        const createFetchResponse = dispatch(questionActions.createQuestion({title, body, asker}))
            .then((data) => {
                if (data.question) {
                    setQuestion(data.question)
                } else {
                    setErrors(data.errors)
                }
            })
    }

    const showErrors = (inputType) => {
        // debugger
        let errorEl;

        errors.forEach((error) => {
            if (error.includes(inputType)) {
                errorEl = <ul className='Error'>{error}</ul>
            }
        })
        return errorEl
    }

    // debugger

    return (
        <div>
            <h1>Ask a public question</h1>
            <form onSubmit={handleSubmit}>
                <label>Title 
                    <span>Be specific and imagine you're asking a question to another person</span>
                    <input type='text'
                        value={title}
                        onChange={handleTitle}
                    />
                </label>
                {showErrors('Title')}
                <label>Body 
                    <span>Include all the information someone would need to answer your question</span>
                    <textarea
                        value={body}
                        onChange={handleBody}
                    />
                </label>
                {showErrors('Body')}
                <button type='submit'>Post your Question</button>
            </form>
        </div>
    )
}

export default QuestionsCreate