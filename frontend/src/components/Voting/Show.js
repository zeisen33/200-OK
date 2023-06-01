import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useSelector } from 'react-redux'

const Voting = ({ props }) => {
    const voterId = useSelector(state => state.session ? state.session.user.id : null)
    const answerId = props.answer.id
    // debugger

    useEffect(() => {
        // debugger
    }, [])
    
    const handleUp = (e) => {
        e.preventDefault()
        voteActions.createVote({voterId, voted_AnswerId: answerId, direction: true})
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