import csrfFetch from "./csrf"

const RECEIVE_USER = 'users/RECEIVE_USER'
const REMOVE_USER = 'users/REMOVE_USER'

// Action Creators
export const receiveUser = (user) => {
    // debugger
    return {
        type: RECEIVE_USER,
        user: user
    }
}

export const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId: userId
    }
}

// Thunk Action
export const loginUser = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    const res = await response.json()
    sessionStorage.setItem('currentUser', JSON.stringify(res.user))
    // debugger
    dispatch(receiveUser(res.user))
}

export const logoutUser = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    sessionStorage.setItem('currentUser', null)
    dispatch(removeUser(userId))
}

// Reducer
const sessionReducer = (state={ user: null }, action) => {
    // debugger
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_USER:
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState.user = null
            return newState
        default:
            return state
    }
}

export default sessionReducer
