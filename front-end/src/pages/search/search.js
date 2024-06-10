import React, { useState } from 'react';
import './search.css';
// import axios from 'axios';
//import QuestionMini from '../board/board';

function Result({title, href}) {
    return (<>
        <a href={href}>
            <h4>{title}</h4>
        </a>
    </>);
}


const Search = () => {
    const [sString, setSString] = useState('');
    //0 means search for questions 1 for people
    const [sType, setSType] = useState(0);
    const [title, setTitle] = useState(null);
    const [href, setHref] = useState(null);

    const submitSearch = async (e) => {
        e.preventDefault();
        try {
            if(!sType){ //Searching for posts
                const response = await fetch(`http://localhost:8080/post/${sString}`);
                const dQuestion = await response.json();
                setTitle(dQuestion.title);
                setHref(`http://localhost:3000/question/${dQuestion.id}`)
            } else {
                const response = await fetch(`http://localhost:8080/getProfile/${sString}`);
                const dProfile = await response.json();
                setTitle(dProfile.username);
                setHref(`http://localhost:3000/profile/${dProfile.username}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (<>
    	<form className="search-form" onSubmit={submitSearch}>
			<input className="text-in" name="search-string" type="text" value={sString} onChange={(e) => setSString(e.target.value)} placeholder="Enter a question"/>
            <div className="radio-section">
            <label for="people" className="radio">People</label>
            <input className="" type='radio' value={sType} name="search-type" onClick={(e) => setSType(true)} />
            <label for="question" className="radio">Question</label>
            <input className="" type='radio' value={sType} name="search-type" checked onClick={(e) => setSType(false)} />
            </div>
            <button className="sub-button" type="submit">Search</button>
        </form>
        <div className="result">
            <Result title={title} href={href}/>
        </div>
    </>);
}

export default Search;