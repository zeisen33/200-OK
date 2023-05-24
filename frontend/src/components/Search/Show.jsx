import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../../store/search";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as searchActions from '../../store/search'

const Search = () => {
    const location = useLocation()
    const idxOfQuery = location.search.indexOf('q') + 2
    const query = location.search.slice(idxOfQuery)
    // console.log(query)
    const dispatch = useDispatch();
    const history = useHistory();
    // debugger;

    useEffect(() => {
        dispatch(searchActions.fetchSearchResults(query))
    }, [query])

    const searchResults = useSelector((state) => state.search ? state.search.questions : {});
    
    const resultsMap = () => {
        debugger
        if (!!searchResults) {
            debugger
            return <div>
                {Object.values(searchResults).map(result => <span>{result.title}</span>)}
            </div>
        } else {
            return null
        } 
    }

    return(
        <> 
            {resultsMap()}
        </>
    );
}
export default Search;
