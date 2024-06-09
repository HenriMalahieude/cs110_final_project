import React from "react";
import Search from "../search/search.js";
import "./board.css";
import axios from 'axios';

function QuestionMini ({title, username, date, id}) {
	return (<>

		<a href={`http://localhost:3000/question/${id}`}>
		<div className="post">
			<h3 className="title">Question: {title}</h3>
			<h5 className="uname">Posted By:{username}</h5>
			<p className="date">date: {date}</p>
		</div>
		</a>
	</>);
}

async function getQuestionList(arr) {
	try {
		const response = await axios.get("http://localhost:8080/getQuestions");
		const questions = response.json();

		for await (const question of questions){
			await arr.push(<QuestionMini title={question.title} username={question.author_username} date={question.date} id={question.id}/>);
		}	
	} catch (error) {
		console.log(error);
	}
}

export function QuestionBoard() {
	const questionMinis = [];
	getQuestionList(questionMinis);

	return (<>
		<div className="posts">
			{questionMinis}
		</div>
	</>);
}