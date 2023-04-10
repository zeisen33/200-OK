import csrfFetch from "./csrf"

const RECEIVE_USER = 'api/RECEIVE_USER'
const RECEIVE_USERS = 'api/RECEIVE_USERS'

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user: user
    }
}

export const receiveUsers = (users) => {
    // debugger
    return {
    type: RECEIVE_USERS, 
    users: users
    }
}

export const getUsers = (state) => {
    return state.users
}

export const getUser = (userId) => (state) => {
    // debugger
    if (Object.keys(state.users).length > 0) {
        return state.users[userId]
    } else {
        return null
    }
}

export const getAsker = (askerId) => (state) => {
    // debugger
    return state.users[askerId]
}

export const getCurrentUserId = (state) => {
    // debugger
    if (state.session.user) {
        return state.session.user.id
    } else {
        return null
    }
}


export const fetchUser = (userId) => async dispatch => {
    const res = csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(receiveUser(data))
    }
}

export const fetchAllUsers = () => async dispatch => {
    debugger
    const res = await csrfFetch(`/api/users`, {
        method: "GET"
    })
    // debugger
    if (res.ok) {
        debugger
        const data = await res.json();
        debugger
        dispatch(receiveUsers(data))
    }
}

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let nextState = { ...state }
    // debugger
    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.user.id] = action.user
            return nextState
        case RECEIVE_USERS:
            debugger
            nextState = { ...state, ...action.users}
            debugger
            return nextState
        // case RECEIVE_QUESTION:
        //     nextState[action.payload.asker.id] = action.payload.asker
        default: 
            return state
    }
}

export default usersReducer