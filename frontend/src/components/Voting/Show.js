import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useSelector } from 'react-redux'

const Voting = ({ props }) => {
    const voterId = useSelector(state => state.session ? state.session.user.id : null)
    const answerId = props.answer.id
    const [voteChanged, setVoteChanged] = useState(false)
    const [currDir, setCurrDir] = useState(null)
    const [vote, setVote] = useState(null)
    // debugger

    useEffect(() => {
        const vFunction = async () => {
            const v = await voteActions.fetchVoteByAnswerIdAndVoterId(answerId, voterId)
            // debugger
            setVote(v.length > 0 ? v[0] : null)
            setCurrDir(v.length > 0 ? v[0].direction : null)
        }
        // debugger

        // await setCurrDir(vote.direction)
        vFunction()
        setVoteChanged(false)
    }, [voteChanged])
    
    const handleUp = async (e) => {
        // debugger
        e.preventDefault()
        // debugger
        if (vote) {
            await voteActions.destroyVote(vote.id, answerId)
        } else {
            await voteActions.createVote({voterId, votedAnswerId: answerId, direction: true}, answerId)
        }
        setVoteChanged(true)
    }

    const handleDown = async (e) => {
        e.preventDefault()
        if (vote) {
            await voteActions.destroyVote(vote.id, answerId)
        } else {
            // debugger
            await voteActions.createVote({voterId, votedAnswerId: answerId, direction: false}, answerId)
        }
        setVoteChanged(true)
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