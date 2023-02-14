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
  // debugger
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
    // debugger
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

const initialState = { user: null }

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

    // sessionStorage.setItem('currentUser', null)
    storeCurrentUser(null)
    dispatch(removeCurrentUser(userId))
}

export const signup = (user) => async (dispatch) => {
  const { displayName, email, password } = user;
  const response = await csrfFetch("api/users", {
    method: "POST",
    body: JSON.stringify({
      displayName,
      email,
      password
    })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

// Reducer
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return { ...state, user: action.payload };
      case REMOVE_CURRENT_USER:
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  
export default sessionReducer
