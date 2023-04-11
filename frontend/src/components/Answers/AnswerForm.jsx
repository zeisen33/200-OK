import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as answerActions from '../../store/answers'

const AnswerForm = () => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    let formType = 'Create'
    const currentUser = useSelector((state) => state.session ? state.session.user : 'guest')
    let currentUsersAnswer = useSelector((state) => {
        
        let returnThisAnswer = ''
        // debugger
        Object.values(state.answers).forEach((answer) => {
            // debugger
            if (answer.authorId === currentUser.id && answer.questionId === parseInt(questionId)) {
                // debugger
                returnThisAnswer = answer
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
        debugger
        if (formType === 'Post') {
            dispatch(answerActions.createAnswer(answer))
        } else {
            answer.id = currentUsersAnswer.id
            dispatch(answerActions.updateAnswer(answer))
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(answerActions.deleteAnswer(currentUsersAnswer.id))
    }

    const discardButton = <button onClick={(e) => {
        e.preventDefault();
        setBody(currentUsersAnswer.body)
    }}>Discard Changes</button>;

    return (
        <form onSubmit={handleCreateOrUpdate}>Your Answer
            <textarea 
                value={body}
                onChange={handleChange}
            />
            <button type='submit'>{formType} Your Answer</button>
            {/* <button onClick={(e) => {
                debugger
                setBody(currentUsersAnswer.body)}
            }>Discard</button> */}
            
            {discardButton}
            <button onClick={handleDelete}>Delete Your Answer</button>
        </form>
    )
}

export default AnswerForm;