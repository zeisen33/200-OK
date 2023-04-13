import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchText, setSearchText] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = e.target.value;
        await setSearchText(query);
        dispatch(fetchSearchResults(query))
    }
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchText.length > 0) {
            history.push(`/search?songs=${searchText}`)
        }
    }

    return (
        <>
            <input type='text' onChange={handleSearch} placeholder="Search.."></input>
            <button onClick={handleSearchSubmit}>search</button>
        </>
    )
}