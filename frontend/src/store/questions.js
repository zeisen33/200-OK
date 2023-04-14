import csrfFetch from "./csrf"
import { fetchAllUsers } from "./users"
import { receiveUser, receiveUsers } from "./users"
import { receiveAnswers } from './answers'

const RECEIVE_QUESTIONS = '/api/RECEIVE_QUESTIONS'
const RECEIVE_QUESTION = '/api/RECEIVE_QUESTION'
const REMOVE_QUESTION = '/api/REMOVE_QUESTION'

export const receiveQuestion = (question) => {
    // debugger
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

export const removeQuestion = (questionId) => {
    return {
        type: REMOVE_QUESTION,
        questionId: questionId
    }
}

export const getQuestion = (questionId) => (state) => {
    // debugger
    if (Object.keys(state.questions).length > 0) {
        // debugger
        return state.questions[questionId]
    } else {
        // debugger
        return null
    }
    // return state?.questions ? state.questions[questionId] : null;
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
    dispatch(receiveUsers(data.askers))
    dispatch(receiveQuestions(data.questions))
    // dispatch(receiveUsers)
}

export const fetchQuestion = (questionId) => async (dispatch) => {
    // debugger
    const response = await csrfFetch(`/api/questions/${questionId}`)

    const data = await response.json()
    // debugger
    // data.question maybe
    dispatch(receiveUser(data.asker))
    dispatch(receiveQuestion(data.question))
    dispatch(receiveAnswers(data.answers))
}

export const createQuestion = (question) => async (dispatch) => {
    // debugger
    const response = await csrfFetch(`/api/questions`, {
        method: 'POST',
        body: JSON.stringify(question)
    })

    // debugger
    if (response.ok) {
        // debugger
        const data = await response.json();
        if (!data.errors) {
            dispatch(receiveQuestion(data.question))
        }
        return data

        // remove double dispatch and use payload in action instead
    }
}

export const updateQuestion = (question) => async (dispatch) => {
    // debugger
    // csrfFetch needs a questionId, but backend expects no key of id
    const questionId = question.id
    delete question.id

    const response = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        body: JSON.stringify(question)
    })

    const data = await response.json();
    // debugger
    // dispatch(receiveUser(data.asker))
    dispatch(receiveQuestion(data))
    return data
}

export const deleteQuestion = (questionId) => async (dispatch) => {
    const response = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    })

    dispatch(removeQuestion(questionId))
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
            // debugger
            // nextState[action.payload.question.id] = action.payload.question
            nextState[action.question.id] = action.question
            // debugger
            return nextState
        case REMOVE_QUESTION:
            debugger
            delete nextState[action.questionId]
            return nextState
        default:
            return state
    }

}

export default questionsReducer