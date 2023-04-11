import * as userActions from '../../store/users'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './AnswersShow.css'

const AnswersShow = (props) => {
    const dispatch = useDispatch();
    const answer = props.answer
    // debugger
    const authorId = answer.authorId
    const answerAuthor = useSelector((state) => {
        if (authorId) {
            return state.users[authorId]
        }
    })

    // debugger
    return (
        <div id='AnswerShowCont'>
            <h1 id='answerBody'>{answer.body}</h1>
            <div id='AnsweredByCont'>
                <h3>Answered by {answerAuthor?.displayName}</h3>
            </div>
        </div>
    )
}

export default AnswersShow