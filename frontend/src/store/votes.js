import csrfFetch from "./csrf";

export const RECEIVE_VOTESUM = 'voteSum'

export const receiveVoteSum = (answerId, sum) => {
    // debugger
    return ({
        type: RECEIVE_VOTESUM,
        answerId: answerId,
        sum: sum
    })
}
export const fetchVoteSum = (answerId) => async (dispatch) => {
    const votesAndVoters = await fetchVotesByAnswerId(answerId)
    // debugger
    const votes = Object.values(votesAndVoters).length > 0 ? Object.values(votesAndVoters.answerVotes) : []
    const upVotes = votes.filter(vote => vote.direction === true)
    const downVotes = votes.filter(vote => vote.direction === false)
    // debugger
    const sum = upVotes.length - downVotes.length
    dispatch(receiveVoteSum(answerId, sum))
    return sum
}


// doesn't put into store
export const fetchVotesByAnswerId = async (answerId) => {
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes`)

    const data = await res.json()
    return data;
}


export const createVote = async (vote, answerId) => {
    // debugger
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes`, {
        method: 'POST',
        body: JSON.stringify(vote)
    })

    const data = await res.json()
    // debugger
    return data
}

export const destroyVote = async (voteId, answerId) => {
    // debugger
    const res = await csrfFetch(`/api/answers/${answerId}/answer_votes/${voteId}`, {
        method: 'DELETE'
    })
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


// MOVED TO ANSWERS REDUCER
// const voteSumReducer = (state={}, action) => {
//     // debugger
//     Object.freeze(state)
//     let nextState = { ...state }
//     switch (action.type) {
//         case RECEIVE_VOTESUM:
//             // debugger
//             nextState[`answerId=${action.answerId}`] = action.sum
//             return nextState
//         default:
//             return nextState
//     }
// }

// export default voteSumReducer