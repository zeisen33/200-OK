import "./NoWizard.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as questionActions from "../../../store/questions.js"
import { Redirect, Link } from "react-router-dom"

const NoWizard = () => {
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

    const inputClassName = () => errors.length > 0 ? 'errorInput' : 'input'

    // debugger

    return (
        <div id='fullPage'>
        <div id='NoWizContainer'>
            <h1 id='PageTitle'>Ask a public question</h1>
                <div id='formContainer'>
            <form id='NoWizForm' onSubmit={handleSubmit}>
                <div id='formattingDiv' >
                    <div id='formContents'>
                <label>Title
                    <br/>
                    <span className='smallText'>Be specific and imagine you're asking a question to another person</span>
                    <br/>
                    <input className={inputClassName()} id='NewTitle' 
                        type='text'
                        value={title}
                        onChange={handleTitle}
                        placeholder='e.g. Are strings mutable in Ruby?'
                        />
                </label>
                {showErrors('Title')}
                <div id='BodyContainer'>
                <label id='BodyLabel'>Body 
                    <br/>
                    <span className='smallText'>Include all the information someone would need to answer your question</span>
                    <br/>
                    <textarea className='input' id='NewBodyInput'
                        value={body}
                        onChange={handleBody}
                        />
                </label>
                        </div>
                        
                                        </div>
                {showErrors('Body')}
                        </div>
                        <br/>
                <button className='BlueButton' for='CreateForm' type='submit'>Post your Question</button>  
            </form>
                </div>
            </div>  
        </div>
    )
}

export default NoWizard