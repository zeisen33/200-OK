import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useSelector } from 'react-redux'

const Voting = ({ props }) => {
    const voterId = useSelector(state => state.session ? state.session.user.id : null)
    const answerId = props.answer.id
    const [voted, setVoted] = useState(false)
    const [currDir, setCurrDir] = useState(null)
    const [vote, setVote] = useState(null)
    // debugger

    useEffect(async () => {
        // debugger
        const v = await voteActions.fetchVoteByAnswerIdAndVoterId(answerId, voterId)
        // debugger
        setVote(v.length > 0 ? v[0] : null)
        setCurrDir(v.length > 0 ? v[0].direction : null)
        // await setCurrDir(vote.direction)
    }, [voted])
    
    const handleUp = (e) => {
        e.preventDefault()
        voteActions.createVote({voterId, votedAnswerId: answerId, direction: true}, answerId)
        setVoted(true)
    }

    const handleDown = (e) => {
        e.preventDefault()
        voteActions.createVote({voterId, voted_AnswerId: answerId, direction: false}, answerId)
        setVoted(true)
    }

    return (
        <div>Hello from Voting
            <button onClick={handleUp}>UpVote</button>
            <span>CurrDir: {`${currDir}`}</span>
            <span>Score: </span>
            <button onClick={handleDown}>DownVote</button>
        </div>
    )
} 

export default Voting