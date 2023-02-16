import csrfFetch from "./csrf"

const RECEIVE_QUESTIONS = '/api/RECEIVE_QUESTIONS'
const RECEIVE_QUESTION = '/api/RECEIVE_QUESTION'

export const receiveQuestion = (question) => {
    return {
        type: RECEIVE_QUESTION,
        question: question
    }
}

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions
    }
}

export const getQuestion = (questionId) => (state) => {
    return state?.questions ? state.questions[questionId] : null;
}

export const getQuestions = (state) => {
    return state?.questions ? Object.values(state.questions) : []
}

export const fetchAllQuestions = () => async (dispatch) => {
    // debugger
    const response = await csrfFetch('/api/questions', {
        method: 'GET'
        // debugger
        })
    
    const data = await response.json()
    // debugger
    dispatch(receiveQuestions(data.questions))
}

export const fetchQuestion = (questionId) => async (dispatch) => {
    const response = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'GET'
    })

    const data = await response.json()
    // debugger
    // data.question maybe
    dispatch(receiveQuestion(data))

}


const questionsReducer = (state={}, action) => {
    // debugger
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case RECEIVE_QUESTIONS:
            nextState = { ...state, ...action.questions} 
            return nextState
        case RECEIVE_QUESTION:
            nextState[action.question.id] = action.question
            return nextState
        default:
            return state
    }

}

export default questionsReducer