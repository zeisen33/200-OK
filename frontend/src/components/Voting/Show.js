import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useDispatch, useSelector } from 'react-redux'
import './Show.css'

const Voting = ({ answer }) => {
    // debugger
    const dispatch = useDispatch();
    const voterId = useSelector(state => state.session.user ? state.session.user.id : null)
    const answerId = answer.id
    const [voteChanged, setVoteChanged] = useState(false)
    const [currDir, setCurrDir] = useState(null)
    const [vote, setVote] = useState('none')
    const [score, setScore] = useState(0)
    const votes = useSelector(state => state ? state.votes.answerVotes : [])
    console.log(votes)
    console.log(typeof votes)
    if (votes) {
        console.log(Object.values(votes))
    }

    // const answers = useSelector((state) => {
    //     return state.answers
    // })
    // console.log(answers)

    useEffect(() => {
        const fetchVotes = async () => {
            await dispatch(voteActions.fetchVotesByAnswerId(answerId))
        } 
        // const vFunction = async () => {
        //     const v = await voteActions.fetchVoteByAnswerIdAndVoterId(answerId, voterId)
        //     // debugger
        //     setVote(v.length > 0 ? v[0] : null)
        //     setCurrDir(v.length > 0 ? v[0].direction : 'none')
        // }
        // debugger
        const voteSum = async () => {
            // debugger
            // setScore(voteScore)
        }

        // // debugger
        // vFunction()
        // voteSum()
        // setVoteChanged(false)
        // // debugger

        fetchVotes()
        // debugger
    }, [voteChanged, answer])
    
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

    const upTri = () => {
        if (currDir === true) {
            return <div className='tri-up' id='tri-up-Curr'></div>
        } else {
            return <div className='tri-up' id='tri-up'></div>
        }
    }

    const downTri = () => {
        if (currDir === false) {
            return <div className='tri-down' id='tri-down-Curr'></div>
        } else {
            return <div className='tri-down' id='tri-down'></div>
        }
    }

    const upButton = () => {
        if (currDir === true) {
            return <button className='VoteButton' id='upVoteCurr' onClick={handleUp}>{upTri()}</button>
        } else {
            return <button className='VoteButton' id='upVote' onClick={handleUp}>{upTri()}</button>
        }
    }

    const downButton = () => {
        if (currDir === false) {
            return <button className='VoteButton' id='downVoteCurr' onClick={handleDown}>{downTri()}</button>
        } else {
            return <button className='VoteButton' id='downVote' onClick={handleDown}>{downTri()}</button>
        }
    }

    return (
        <div id='VotingControls'>
            {upButton()}
            <span id='score'>{answer.voteSum}</span>
            {downButton()}
        </div>
    )
} 

export default Voting