import csrfFetch from "./csrf";

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