import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useSelector } from 'react-redux'

const Voting = ({ props }) => {
    const voterId = useSelector(state => state.session.user ? state.session.user.id : null)
    const answerId = props.answer.id
    const [voteChanged, setVoteChanged] = useState(false)
    const [currDir, setCurrDir] = useState(null)
    const [vote, setVote] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const vFunction = async () => {
            const v = await voteActions.fetchVoteByAnswerIdAndVoterId(answerId, voterId)
            // debugger
            setVote(v.length > 0 ? v[0] : null)
            setCurrDir(v.length > 0 ? v[0].direction : null)
        }
        // debugger
        const voteSum = async () => {
            // debugger
            const voteScore = await voteActions.fetchVoteSum(answerId)
            // debugger
            setScore(voteScore)
        }

        // debugger
        vFunction()
        voteSum()
        setVoteChanged(false)
        // debugger
    }, [voteChanged])
    
    const handleUp = async (e) => {
        // debugger
        e.preventDefault()
        // debugger
        if (voterId) {
            if (vote) {
                // debugger
                await voteActions.destroyVote(vote.id, answerId)
            } else {
                // debugger
                await voteActions.createVote({voterId, votedAnswerId: answerId, direction: true}, answerId)
            }
            // debugger
            setVoteChanged(true)
        } else {
            alert('You must be logged in to vote')
        }
    }

    const handleDown = async (e) => {
        e.preventDefault()
        if (voterId) {
            if (vote) {
                await voteActions.destroyVote(vote.id, answerId)
            } else {
                // debugger
                await voteActions.createVote({voterId, votedAnswerId: answerId, direction: false}, answerId)
            }
            setVoteChanged(true)
        } else {
            alert('You must be logged in to vote')
        }
    }

    return (
        <div>Hello from Voting
            <button onClick={handleUp}>UpVote</button>
            <span>CurrDir: {`${currDir}`}</span>
            <span>Score: {score}</span>
            <button onClick={handleDown}>DownVote</button>
        </div>
    )
} 

export default Voting