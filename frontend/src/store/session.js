import csrfFetch from "./csrf"

const SET_CURRENT_USER = 'session/setCurrentUser'
const REMOVE_CURRENT_USER = 'session/removeCurrentUser'
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

const setCurrentUser = (user) => {
    return {
      type: SET_CURRENT_USER,
      payload: user
    };
  };
  
  const removeCurrentUser = () => {
    return {
      type: REMOVE_CURRENT_USER
    };
  };

// Thunk Action
export const loginUser = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    const res = await response.json()
    storeCurrentUser(res.user)
    dispatch(setCurrentUser(res.user))
    return response
    // sessionStorage.setItem('currentUser', JSON.stringify(res.user))
    // debugger
    // dispatch(receiveUser(res.user))
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
}

const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token")
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user))
    else sessionStorage.removeItem("currentUser")
}

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch("/api/session")
    storeCSRFToken(response)
    const data = await response.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response
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
