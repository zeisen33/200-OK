import * as userActions from '../../store/users'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './AnswersShow.css'
import Voting from '../Voting/Show'
import * as voteActions from '../../store/votes'

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

    useEffect(() => {
        const fetchVotes = async () => {
            await dispatch(voteActions.fetchVotesByAnswerId(answer.id))
        }
        // debugger
    },[answer])


    return (
        <div id='AnswerShowCont'>
            <Voting answer={answer}/>
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