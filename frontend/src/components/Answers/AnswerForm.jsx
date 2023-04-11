import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import * as answerActions from '../../store/answers'
import './AnswerForm.css'

const AnswerForm = () => {
    const dispatch = useDispatch();
    const [draftDiscarded, setDraftDiscarded] = useState(false)
    const [deleteErrors, setDeleteErrors] = useState(false)
    const [answerErrors, setAnswerErrors] = useState([])
    const [loggedInErrors, setLoggedInErrors] = useState([])
    const { questionId } = useParams();
    let formType = 'Create'
    const currentUser = useSelector((state) => state.session.user ? state.session.user : 'guest')
    let currentUsersAnswer = useSelector((state) => {
        
        let returnThisAnswer = ''
        // debugger
        Object.values(state.answers).forEach((answer) => {
            // debugger
            if (currentUser != 'guest') {
                if (answer.authorId === currentUser.id && answer.questionId === parseInt(questionId)) {
                    // debugger
                    returnThisAnswer = answer
                }
            }
            // debugger
        })

        return returnThisAnswer
    })
    // debugger
    
    if (currentUsersAnswer) {
        formType = 'Update'
    } else {
        formType = 'Post'
    }

    const [body, setBody] = useState('')

    useEffect(() => {
        // debugger
        if (currentUsersAnswer) {
            setBody(currentUsersAnswer.body)
        }
    }, [currentUsersAnswer])

    const handleChange = (e) => {
        setBody(e.target.value);
    }
    
    const handleCreateOrUpdate = (e) => {
        // debugger
        e.preventDefault();
        const answer = {body, authorId: currentUser.id, questionId: parseInt(questionId)}
        // debugger
        if (currentUser != 'guest') {
            if (formType === 'Post') {
                dispatch(answerActions.createAnswer(answer))
            } else {
                answer.id = currentUsersAnswer.id
                dispatch(answerActions.updateAnswer(answer))
            } 
        } else {
            setLoggedInErrors(`To ${formType} your answer, you must`)
        }
        }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(answerActions.deleteAnswer(currentUsersAnswer.id))
        if (currentUser === 'guest') {
            setDeleteErrors(true)
        }
    }

    const discardButton = <button onClick={(e) => {
        e.preventDefault();
        setBody(currentUsersAnswer.body ? currentUsersAnswer.body : '')
        setDraftDiscarded(true)
    }}>Discard Changes</button>;

    const LoggedInErrorsLink = () => {
        if (loggedInErrors.length > 0) {
            return <Link to='/login'>Log In</Link>
        } else {
            return null
        }
    }

    return (
        <div id='AnswerFormCont' >
            <form id='AnswerForm'onSubmit={handleCreateOrUpdate}><span id='YourAnswerSpan'>Your Answer</span>
                <textarea id='AnswerFormTextarea'
                    value={body}
                    onChange={handleChange}
                    />
                {draftDiscarded ? <span>Draft Discarded</span> : null}
                {answerErrors}
                <button type='submit'>{formType} Your Answer</button>
                {loggedInErrors}
                <LoggedInErrorsLink />
                {/* <button onClick={(e) => {
                    debugger
                    setBody(currentUsersAnswer.body)}
                }>Discard</button> */}
                
                {discardButton}
                <button onClick={handleDelete}>Delete Your Answer</button>
                {deleteErrors ? <span>You are not logged in.</span> : null}
            </form>
        </div>
    )
}

export default AnswerForm;