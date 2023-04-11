import { useState } from "react";
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
                debugger
                returnThisAnswer = answer
            }
            debugger
        })

        return returnThisAnswer
    })
    debugger
    
    if (currentUsersAnswer) {
        formType = 'Update'
    } else {
        formType = 'Post'
    }

    const [body, setBody] = useState(currentUsersAnswer)

    const handleChange = (e) => {
        setBody(e.target.value);
    }
    
    const handleSubmit = (e) => {
        // debugger
        e.preventDefault();
        const answer = {body, authorId: currentUser.id, questionId: parseInt(questionId)}
        // debugger
        dispatch(answerActions.createAnswer(answer))
    }

    return (
        <form onSubmit={handleSubmit}>Your Answer
            <textarea 
                value={body}
                onChange={handleChange}
            />
            <button type='submit'>{formType} Your Question</button>
        </form>
    )
}

export default AnswerForm;