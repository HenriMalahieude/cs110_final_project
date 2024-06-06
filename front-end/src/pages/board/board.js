import React from "react";
import Search from "../search/search.js";
import "./board.css";

function QuestionMini ({title, username, date}) {
	return (<>
		<div>
			<h4>{title}</h4>
			<h5>{userName}</h5>
			<p>{date}</p>
		</div>
	</>);
}

export async function QuestionBoard() {

	const questionMinis = [];
	try {
		const response = await get("http://localhost:8080/getQuestions");
		const questions = response.json();

		for(const question of questions){
			questionMinis.push(<QuestionMini title={question.title} username={question.author_username} date={question.date} />);
		}	
	} catch (error) {
		console.log(error);
	}

	return (<>
		<div className="search-section">
			<Search />;
			{qestionMinis}
		</div>
	</>);
}