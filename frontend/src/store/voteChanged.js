import { merge } from 'lodash'

export const RECEIVE_VOTECHANGED = 'voteChanged'
export const REMOVE_VOTECHANGED = 'removeVoteChanged'

export const receiveVoteChanged = () => {
    return ({
        type: RECEIVE_VOTECHANGED,
        status: true
    })
}

export const removeVoteChanged = () => {
    return ({
        type: REMOVE_VOTECHANGED,
        status: false
    })
}

const voteChangedReducer = (state={status: false}, action) => {
    // Object.freeze(state)
    let nextState = merge({}, state)
    switch (action.type) {
        case RECEIVE_VOTECHANGED:
            nextState["status"] = action.status
            return nextState
        case REMOVE_VOTECHANGED:
            nextState["status"] = action.status
            return nextState
        default:
            return nextState
    }
}

export default voteChangedReducer