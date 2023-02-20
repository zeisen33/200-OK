import csrfFetch from "./csrf"

const RECEIVE_USER = 'api/RECEIVE_USER'
const RECEIVE_USERS = 'api/RECEIVE_USERS'

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user: user
    }
}

const receiveUsers = (users) => {
    debugger
    return {
    type: RECEIVE_USERS, 
    users: users
    }
}

export const getUsers = (state) => {
    return state?.users ? Object.values(state.users) : []
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
    const res = csrfFetch(`/api/users`, {
        method: "GET"
    })
    debugger
    if (res.ok) {
        const data = await res.json()
        debugger
        dispatch(receiveUsers(data.users))
    }
}

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let nextState = { ...state }
    debugger
    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.user.id] = action.user
            return nextState
        case RECEIVE_USERS:
            debugger
            nextState = { ...state, ...action.users}
            debugger
            return nextState
        default: 
            return state
    }
}

export default usersReducer