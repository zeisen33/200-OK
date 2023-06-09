import { useEffect, useState } from 'react'
import * as voteActions from '../../store/votes'
import { useDispatch, useSelector } from 'react-redux'
import './Show.css'
import * as voteChangedActions from '../../store/voteChanged'

const Voting = ({ answer }) => {
    // debugger
    const dispatch = useDispatch();
    const voterId = useSelector(state => state.session.user ? state.session.user.id : null)
    const answerId = answer.id
    const [voteChanged, setVoteChanged] = useState(false)
    const votes = useSelector(state => state ? state.votes.answerVotes : [])
    const thisAnswersVotes = votes ? Object.values(votes).filter(vote => vote.votedAnswerId === answerId) : []
   
    const thisUsersVote = thisAnswersVotes.filter(vote => vote.voterId === voterId)[0]
    // console.log(thisUsersVote)
    
    const findCurrDir = () => {
        if (thisUsersVote) {
            return thisUsersVote.direction
        } else {
            return 'none'
        }
    }

    const currDir = findCurrDir()
    // console.log(currDir)
    // const [currDir, setCurrDir] = useState(null)
    const upVotes = thisAnswersVotes.filter(vote => vote.direction === true)
    const downVotes = thisAnswersVotes.filter(vote => vote.direction === false)
    const score = upVotes.length - downVotes.length

    // debugger

    useEffect(() => {
        const fetchVotes = async () => {
            await dispatch(voteActions.fetchVotesByAnswerId(answerId))
        } 
        // debugger
        fetchVotes()
        // debugger
    }, [voteChanged, answer])
    
    const handleUp = (e) => {
        // debugger
        e.preventDefault()
        // debugger
        if (voterId) {
            if (currDir !== 'none') {
                // debugger
                dispatch(voteActions.destroyVote(thisUsersVote.id, answerId))
            } else {
                // debugger
                dispatch(voteActions.createVote({voterId, votedAnswerId: answerId, direction: true}, answerId))
            }
            // debugger
            setVoteChanged(true)
            dispatch(voteChangedActions.receiveVoteChanged())
        } else {
            alert('You must be logged in to vote')
        }
    }

    const handleDown = (e) => {
        e.preventDefault()
        debugger
        if (voterId) {
            if (currDir !== 'none') {
                debugger
                dispatch(voteActions.destroyVote(thisUsersVote.id, answerId))
            } else {
                debugger
                dispatch(voteActions.createVote({voterId, votedAnswerId: answerId, direction: false}, answerId))
            }
            setVoteChanged(true)
            dispatch(voteChangedActions.receiveVoteChanged())
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
            <span id='score'>{score}</span>
            {downButton()}
        </div>
    )
} 

export default Voting