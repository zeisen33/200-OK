import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import * as answerActions from '../../store/answers'
import './AnswerForm.css'

const AnswerForm = () => {
    const dispatch = useDispatch();
    const [draftDiscarded, setDraftDiscarded] = useState(false)
    const [deleteErrors, setDeleteErrors] = useState(false)
    const [answerErrors, setAnswerErrors] = useState([false])
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

    useEffect(() => {
        setDeleteErrors(false)
        setAnswerErrors(false)
    }, [body])

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
                // debugger
                return dispatch(answerActions.createAnswer(answer))
                    .then(async (data) => {
                        // let data;
                        // debugger
                        // try {
                        //     debugger
                        //     data = await res.clone().json();
                        //     debugger
                        // } catch {
                        //     debugger
                        //     data = await res.text()
                        //     debugger
                        // }
                        setAnswerErrors(data.errors)
                        // else if (data) setAnswerErrors([data])
                        // else setAnswerErrors([res.statusText]);
                    })
            } else {
                answer.id = currentUsersAnswer.id
                return dispatch(answerActions.updateAnswer(answer))
                    .then(async (data) => {
                        // debugger
                        setAnswerErrors(data.errors)
                    })
            } 
        } else {
            setLoggedInErrors(`To ${formType} your answer, you must log in or sign up.`)
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(answerActions.deleteAnswer(currentUsersAnswer.id))
        if (currentUser === 'guest') {
            setDeleteErrors('You are not logged in.')
        } else if (currentUsersAnswer === '') {
            setDeleteErrors('You have not answered this question.')
        }
    }

    const discardButton = <button id='discardButton' onClick={(e) => {
        e.preventDefault();
        setBody(currentUsersAnswer.body ? currentUsersAnswer.body : '')
        setDraftDiscarded(true)
    }}>Discard Changes</button>;

    const Links = () => {
        if (currentUser === 'guest') {
            return (
                <div id='AnswerLinksCont'>
                    <Link id='AnswerLink1' className='inSiteLink' to='/signup'>Sign Up</Link>
                    or
                    <Link id='AnswerLink2' className='inSiteLink' to='/login'>Log In</Link>
                </div>
            )
        } else {
            return null
        }
    }

    const ShowLoggedInErrors = () => {
        // debugger
        if (loggedInErrors.length != 0) {
            return (
                <div className='answerFormErrorsDiv'>
                    <span className='redWhiteText'>{loggedInErrors}</span>
                    {/* <LoggedInErrorsLink /> */}
                </div>
            )
        } else {
            return null
        }
    }

    const ShowDeleteErrors = () => {
        // debugger
        if (deleteErrors) {
            return (
                <div className='answerFormErrorsDiv'>
                    <span className='redWhiteText'>{deleteErrors ? <span>{deleteErrors}</span> : null}</span>
                </div>
            )
            return null;
        }
    }

    const ShowAnswerErrors = () => {
        if (answerErrors) {
            return (
                <div className='answerFormErrorsDiv'>
                    <span className='redWhiteText'>{answerErrors[0]}</span>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div id='AnswerFormCont' >
            <form id='AnswerForm'onSubmit={handleCreateOrUpdate}><span id='YourAnswerSpan'>Your Answer</span>
                <textarea id='AnswerFormTextarea' className='input'
                    value={body}
                    onChange={handleChange}
                    />
                <div id='DraftDiscardedCont'>

                {draftDiscarded ? <span id='draftDiscarded'>Draft Discarded</span> : null}
                </div>
                <ShowAnswerErrors />
                {<Links></Links>}
                <div id='AnswerButtonsCont'>
                    <button id='PostUpdate' type='submit' className='BlueButton'>{formType} Your Answer</button>
                    {discardButton}
                    <button id='deleteAnswer' className='deleteButton' onClick={handleDelete}>Delete Your Answer</button>
                </div>
                <ShowLoggedInErrors />
                <ShowDeleteErrors />
            </form>
        </div>
    )
}

export default AnswerForm;