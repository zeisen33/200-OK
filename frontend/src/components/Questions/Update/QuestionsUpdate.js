import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, Link, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import * as questionActions from '../../../store/questions'
import * as userActions from '../../../store/users'
import './QuestionsUpdate.css'

const QuestionsUpdate = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUserId = useSelector(userActions.getCurrentUserId)
    const { questionId } = useParams();
    const question = useSelector(questionActions.getQuestion(questionId))
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    // debugger
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    // debugger
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        // debugger
        dispatch(questionActions.fetchQuestion(questionId))
        // debugger
    }, [questionId])

    useEffect(() => {
        if (question) {
            setTitle(question.title)
            setBody(question.body)
        }
    }, [question])

    // debugger
    if (asker) {
        // debugger
        if (asker.id != currentUserId) {
            // debugger
            // if not signed in as the question asker, cannot edit. Return to show page
            return <Redirect to={`/questions/${questionId}`} />
        }
    }

    if (submitted) {
        // debugger
        console.log('updated')
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
        const createFetchResponse = dispatch(questionActions.updateQuestion({title, body, id: questionId}))
            // debugger
            .then((data) => {
                // debugger
                if (data.errors) {
                    debugger
                    setErrors(data.errors)
                } else {
                    // debugger
                    setSubmitted(true)
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

    const handleDelete = (e) => {
        // e.preventDefault();
        debugger
        if (currentUserId === question.askerId) {
            debugger
            dispatch(questionActions.deleteQuestion(questionId))
            history.push(`/questions`)
        
        // Else should never hit because it's a repeat of deleteButton condition
        } else {
            history.push(`/questions/${questionId}`)
        }
        
    }

    const deleteButton = () => {
        if (question && asker) {
        // debugger
            if (currentUserId === question.askerId) {
                return <button className='deleteButton' onClick={handleDelete}>Delete Question</button>
            } else {
                return null
            }
        }
    }

    const inputClassName = () => errors.length > 0 ? 'errorInput' : 'input'

    return (
        <div id='fullPage'>
            <div id='NoWizContainer'>
                <h1 id='PageTitle'>Edit your question</h1>
                <div id='formContainer'>
                    <form id='NoWizForm' onSubmit={handleSubmit}>
                        <div id='formattingDiv' >
                            <div id='formContents' >
                                <label>Title 
                                <br/>
                                    <span className='smallText'>Be specific and imagine you're asking a question to another person</span>
                                <br/>
                                    <input className={inputClassName()} id='NewTitle'
                                        type='text'
                                        value={title}   
                                        onChange={handleTitle}
                                        // placeholder={question.title}
                                    />
                                </label>
                            {showErrors('Title')}
                                <div id='BodyContainer'>
                                    <label>Body 
                                        <br/>
                                        <span className='smallText'>Include all the information someone would need to answer your question</span>
                                        <br/>
                                        <textarea className='input' id='NewBodyInput'
                                            value={body}
                                            onChange={handleBody}
                                            // placeholder={question.body}
                                        />
                                    </label>
                                </div>
                            </div>
                        {showErrors('Body')}
                        </div>
                        <br/>
                        <div id='ButtonsDiv'>
                            <button id='SaveEdits' className='BlueButton' type='submit'>Save Edits</button>
                            <Link id='Cancel' className='inSiteLink' to={`/questions/${questionId}`}><span id='CancelSpan'>Cancel</span></Link>
                            {deleteButton()}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default QuestionsUpdate