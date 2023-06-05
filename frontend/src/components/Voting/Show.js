import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useSelector } from 'react-redux'

const Voting = ({ props }) => {
    const voterId = useSelector(state => state.session ? state.session.user.id : null)
    const answerId = props.answer.id
    // const currVote = props.answer.votes
    // const currVote = props.answer.votes.select(vote => vote.voterId === voterId)
    // debugger

    useEffect(() => {
        debugger
        voteActions.fetchVoteByAnswerIdAndVoterId(answerId, voterId)
    }, [answerId, voterId])
    
    const handleUp = (e) => {
        e.preventDefault()
        voteActions.createVote({voterId, votedAnswerId: answerId, direction: true})
    }

    const handleDown = (e) => {
        e.preventDefault(voteActions.createVote({voterId, voted_AnswerId: answerId, direction: false})
        )
    }

    return (
        <div>Hello from Voting
            <button onClick={handleUp}>UpVote</button>
            <span>Score: </span>
            <button onClick={handleDown}>DownVote</button>
        </div>
    )
} 

export default Voting