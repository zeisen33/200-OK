import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../../store/search";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import * as searchActions from '../../store/search'
import * as userActions from '../../store/users'
import './Show.css'

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
    
    // const resultsMap = () => {
    //     debugger
    //     if (!!searchResults) {
    //         debugger
    //         return <div>
    //             {Object.values(searchResults).map(result => <span>{result.title}</span>)}
    //         </div>
    //     } else {
    //         return null
    //     } 
    // }

    const askers = useSelector(state => state.search ? state.search.askers : [])

    const resultsList = () => {
        // return <>Hello from resultsList</>
        debugger
        if (!!searchResults) {
            debugger
            return (
                Object.values(searchResults).map((result) => {    
            return (
            <section>
                <div key={result.id} >
                    <ul id='sectionContentContainer'>
                        <li id='TitleContainer'>
                            <h1 className='QTitle'>
                                <Link className='inSiteLink' to={`/questions/${result.id}`}>{result.title}</Link>
                            </h1>
                        </li>
                        <div id='askedByContainer'>
                            <li className='askedBy'>
                                Asked by: {askers[result.askerId].displayName}
                            </li>
                        </div>
                    </ul>
                </div>
            </section>
            )
            }
                )
            )
        } else {
            return null
        }
    }

    return (
        <div id='OuterQIndexContainer'>
            <div id='TopSec' className='width60'>
                <div id='Tippy' className='QShowTopDiv'>
                    <div id='TopQsContainer' className='TopQsCont'>
                        <h1 id='TopQs'>Search Results</h1>
                        <Link id='AskButton' to='/questions/new' ><span id='AskText'>Ask Question</span></Link>
                    </div>
                </div>
            </div>
            <div id='TopBottomCont'>
                <h3>{`${searchResults ? Object.values(searchResults).length : 0} Results for "${query}"`}</h3>
            </div>
            {resultsList()}
        </div>
    )
}
export default Search;
