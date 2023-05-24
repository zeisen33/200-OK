import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = 'search/searchResults';

export const receiveSearchResults = searchResults => ({
    type: GET_SEARCH_RESULTS,
    searchResults
});

export const fetchSearchResults = (query) => async dispatch => {
    const res = await csrfFetch(`/api/search?q=${query}`);
    const data = await res.json();
    console.log(data)
    dispatch(receiveSearchResults(data));
};

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return action.searchResults.search
        default:
            return state;
    }
};

export default searchReducer;