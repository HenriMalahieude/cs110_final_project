import React, { useState } from 'react';
import './search.css';
import axios from 'axios';

const Search = () => {
    const [sString, setSString] = useState('');

    const submitSearch = async (e) => {
        e.preventDefault();
        try {
            //fin to be get since just search
            const response = await axios.get(`http://localhost:8080/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (<>
    	<form onSubmit={submitSearch}>
			<input className="text-in" name="search-string" type="text" value={sString} onChange={(e) => setSString(e.target.value)} placeholder="Enter a question"/>
            <button className="sub-button" type="submit">Search</button>
        </form>
    </>);
}

export default Search;