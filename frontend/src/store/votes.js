import csrfFetch from "./csrf";

// doesn't put into store
export const fetchVotes = async (answerId) => {
    const res = await csrfFetch(`/api/answer_votes`)

    const data = await res.json()
    return data;
}

export const createVote = async (vote) => {
    debugger
    const res = await csrfFetch(`/api/answer_votes`, {
        method: 'POST'
    })

    const data = await res.json()
    return data
}