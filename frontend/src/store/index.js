import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { default as thunk } from 'redux-thunk'
import sessionReducer from './session'
import questionsReducer from './questions.js'
import usersReducer from './users'
import answersReducer from './answers'
import searchReducer from './search'
import votesReducer from './votes'
import voteChangedReducer from './voteChanged'

const rootReducer = combineReducers({
    session: sessionReducer,
    questions: questionsReducer,
    users: usersReducer,
    answers: answersReducer,
    search: searchReducer,
    votes: votesReducer,
    voteChanged: voteChangedReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

  const configureStore = (preloadedState={}) => {
    return createStore(rootReducer, preloadedState, enhancer)
  }

  export default configureStore