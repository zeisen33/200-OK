import csrfFetch from "./csrf"

export const RECEIVE_ANSWER = '/api/RECEIVE_ANSWER'
export const RECEIVE_ANSWERS = '/api/RECEIVE_ANSWERS'
export const REMOVE_ANSWER = '/api/REMOVE_ANSWER'

export const receiveAnswer = (payload) => {
    return ({
        type: RECEIVE_ANSWER,
        payload: payload
    })
}

export const receiveAnswers = (answers) => {
    // debugger
    const answersWithVotes = answers ? Object.values(answers) : []
    const getSum = (answer) => {
        const votes = answer.votes ? answer.votes : []
        const upVotes = votes.filter(vote => vote.direction === true)
        const downVotes = votes.filter(vote => vote.direction === false)
        const score = upVotes.length - downVotes.length
        return score
    }

    const answersWithSums = answersWithVotes.map(answer => {
        const sum = getSum(answer)
        return {...answer, sum}
    })
    // console.log(answersWithSums)
    const sortedAnswers = answersWithSums.sort((a, b) => b.sum - a.sum)

    return ({
        type: RECEIVE_ANSWERS,
        sortedAnswers: sortedAnswers
    })
}

export const removeAnswer = (answerId) => {
    return ({
        type: REMOVE_ANSWER,
        answerId: answerId
    })
}

export const fetchAnswer = (answerId) => async (dispatch) => {
    const res = await csrfFetch(`/api/answers/${answerId}`)

    const data = await res.json();
    dispatch(receiveAnswer(data))
}

export const fetchAnswers = () => async (dispatch) => {
    const res = await csrfFetch(`/api/answers`)

    const data = await res.json();
    dispatch(receiveAnswers(data))
}

export const createAnswer = (answer) => async (dispatch) => {
    // debugger
    const res = await csrfFetch(`/api/answers`, {
        method: 'POST',
        body: JSON.stringify(answer)
    })

    if (res.ok) {
        const data = await res.json();
        // debugger
        if (data?.errors) {
            return data
        } else {
            dispatch(receiveAnswer(data))
        }
    }
    return res;
}

export const updateAnswer = (answer) => async (dispatch) => {
    // debugger
    const res = await csrfFetch(`/api/answers/${answer.id}`, {
        method: 'PATCH',
        body: JSON.stringify(answer)
    })

    if (res.ok) {
        // debugger
        const data = await res.json();
        if (data?.errors) {
            return data
        } else {
            dispatch(receiveAnswer(data))
        }
    }
    return res
}

export const deleteAnswer = (answerId) => async (dispatch) => {
    const res = await csrfFetch(`/api/answers/${answerId}`, {
        method: 'DELETE'
    })

    dispatch(removeAnswer(answerId))
}

const answersReducer = (state={}, action) => {
    Object.freeze(state)
    let nextState = { ...state }
    switch (action.type) {
        case RECEIVE_ANSWER:
            nextState[action.payload.answer.id] = action.payload.answer
            return nextState;
        case RECEIVE_ANSWERS:
            nextState = { ...state, ...action.sortedAnswers}
        case REMOVE_ANSWER:
            delete nextState[action.answerId]
            return nextState;
        default: 
            return nextState
    }
}

export default answersReducer