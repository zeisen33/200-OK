import * as userActions from '../../store/users'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './AnswersShow.css'
import Voting from '../Voting/Show'

const AnswersShow = (props) => {
    const dispatch = useDispatch();
    const answer = props.answer
    // const votes = props.votes
    // debugger
    const authorId = answer.authorId
    const answerAuthor = useSelector((state) => {
        if (authorId) {
            return state.users[authorId]
        }
    })
    // console.log(props)

    // debugger
    return (
        <div id='AnswerShowCont'>
            <Voting props={props}/>
            <div id='AnswerContent'>
                <h1 id='answerBody'>{answer.body}</h1>
                <div id='AnsweredByCont'>
                    <h3>Answered by {answerAuthor?.displayName}</h3>
                </div>
            </div>
        </div>
    )
}

export default AnswersShow