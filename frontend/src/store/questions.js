import csrfFetch from "./csrf"

const RECEIVE_QUESTIONS = '/api/RECEIVE_QUESTIONS'

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions
    }
}

export const fetchAllQuestions = () => async (dispatch, getState) => {
    debugger
    const response = await csrfFetch('api/questions', {
        method: 'GET'
        // debugger
        })
    
    const data = await response.json()
    dispatch(receiveQuestions(data))
}