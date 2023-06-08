import csrfFetch from "./csrf";

export const RECEIVE_VOTE = 'createVote'
export const RECEIVE_VOTES = 'receiveVotes'
export const REMOVE_VOTE = 'removeVote'
 
export const receiveVote = (vote) => {
    // debugger
    return ({
        type: RECEIVE_VOTE,
        vote
    })
}

export const receiveVotes = (votes) => {
    return ({
        type: RECEIVE_VOTES,
        votes
    })
}

export const removeVote = (voteId) => {
    return ({
        type: REMOVE_VOTE,
        voteId
    })
}


export const fetchVotesByAnswerId = (answerId) => async (dispatch) => {
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes`)

    const data = await res.json()
    dispatch(receiveVotes(data))
    return data;
}


export const createVote = (vote, answerId) => async (dispatch) => {
    debugger
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes`, {
        method: 'POST',
        body: JSON.stringify(vote)
    })

    const data = await res.json()
    debugger
    dispatch(receiveVote(data))
}

export const destroyVote = (voteId, answerId) => async (dispatch) => {
    // debugger
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes/${voteId}`, {
        method: 'DELETE'
    })

    dispatch(removeVote(voteId))
}

export const fetchVoteByAnswerIdAndVoterId = async (answerId, voterId) => {
    if (!voterId) {
        return []
    }
    const res = await fetchVotesByAnswerId(answerId)
    // console.log(res)

    // debugger
    const votes = Object.values(res).length > 0 ? Object.values(res.answerVotes) : []
    // debugger
    const vote = votes.filter(vote => vote.voterId === voterId)
    return vote
}


const votesReducer = (state={}, action) => {
    // debugger
    Object.freeze(state)
    let nextState = { ...state }
    switch (action.type) {
        case RECEIVE_VOTES:
            // debugger
            nextState["answerVotes"] = { ...state.answerVotes, ...action.votes.answerVotes }
            return nextState
        case RECEIVE_VOTE:
            // debugger
            nextState["answerVotes"][action.vote.answerVote.id] = action.vote.answerVote
            // nextState["answerVotes"] = { ...state.answerVotes, ...action.vote.answerVote }

            // nextState[action.vote.answerVote.id] = action.vote.answerVote
            return nextState
        case REMOVE_VOTE:
            // debugger
            delete nextState["answerVotes"][action.voteId]
            return nextState
        default:
            return nextState
    }
}

export default votesReducer