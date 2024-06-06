import React from "react";
import Search from "../search/search.js";
import "./board.css";
import axios from 'axios';

function QuestionMini ({title, username, date}) {
	return (<>
		<div className="post">
			<h3 className="title">Question: {title}</h3>
			<h5 className="uname">Posted By:{username}</h5>
			<p className="date">date: {date}</p>
		</div>
	</>);
}

async function getQuestionList(arr) {
	try {
		const response = await axios.get("http://localhost:8080/getQuestions");
		const questions = response.json();

		for await (const question of questions){
			await arr.push(<QuestionMini title={question.title} username={question.author_username} date={question.date} />);
		}	
	} catch (error) {
		console.log(error);
	}
}

export function QuestionBoard() {
	const questionMinis = [];
	getQuestionList(questionMinis);

	return (<>
		<div className="search-section">

			{/* Not including since Not fully implemented yet 
			<Search />; */}
		</div>
		<div className="posts">
			{questionMinis}
		</div>
	</>);
}