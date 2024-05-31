import './question.css'
import logo from "../../NavBar/logo.svg"
import React from "react";
import { useState, useEffect } from 'react';
import { useMatch } from "react-router-dom";

//Expected Answer format in json form
/* const testAnswers = [
	{
		author_username: "Testing123",
		pfp_img: logo,
		date: "11/11/1111",
		content: "ahah",
	},
]

for (let i = 0; i < 12; i++) {
	testAnswers.push({
		author_username: "Testing123",
		pfp_img: logo,
		date: "11/11/1111",
		content: "ahah",
	});
}

const testComments = [
	{
		author_username: "testing123",
		date: "11/11/1111",
		content: "lorem ipsum small comment"
	},
]

for (let i = 0; i < 12; i++) {
	testComments.push({
		author_username: "testing123",
		date: "11/11/1111",
		content: "lorem ipsum small comment"
	});
} // */

function InteractionClick(onState, compare, setter) {
	if (compare == onState) {
		setter(0);
		return;
	}

	setter(onState);
}

function QuestionContent({username, userimg, title, date, details, imode, setIMode}) {
	return (<>	
		<div className="q-content">
			<div className="qc-meta">
				<div className="qcm-title">{title}</div>
				<div className="qcm-date">{date}</div>
			</div>
			<div className="qc-container">
				<div className="qc-profile">
					<img src={userimg} className="qcp-img" alt="user profile"/>
					<div className="qcp-username">
						{username}
					</div>
				</div>
				<div className="qc-details">
					{details}
				</div>
			</div>

			<div className="qc-interactive">
				<input type="text" placeholder="Interact with post..." className="interaction-txtbox"/>
				<button className="new-comment-button" onClick={() => InteractionClick(1, imode, setIMode)}>
					Add Comment
				</button>
				<button className="new-answer-button" onClick={() => InteractionClick(2, imode, setIMode)}>
					Answer
				</button>
			</div>
		</div>
	</>)
}

function Answer({username, usrimg, date, content}) {
	return (<>
		<div className="qc-container answer">
			<div className="qc-profile">
				<img src={usrimg} className="qcp-img" alt="user profile"/>
				<div className="qcp-username"> {username}</div>
				<div className="qcp-date">{date}</div>
			</div>
			<div className="qc-details">
				{content}
			</div>
		</div>
	</>)
}

function AnswersSection({ content }) {
	let answers = []
	for (let i = 0; i < content.length; i++) {
		answers.push(<Answer key={i} username={content[i].author_username} date={content[i].date} usrimg={content[i].pfp_img} content={content[i].content}/>);
	}

	if (answers.length <= 0) {
		answers.push(<Answer key={0} usrimg={logo} content="This question has yet to be answered."/>);
	}

	return (<>
		<div className="answer-container">
			{answers}
		</div>
	</>)
}

function Comment({usern, date, content}) {
	return (<>
		<div className="comment">
			<div className="c-meta">
				<div className="cm-username">{usern}</div>
				<div className="cm-date">{date}</div>
			</div>
			<div className="c-details">{content}</div>
		</div>
	</>)
}

function Comments({content}) {
	let comments = [];
	for (let i = 0; i < content.length; i++) {
		let comment = content[i];
		comments.push(<Comment key={i} usern={comment.author_username} date={comment.date} content={comment.content}/>);
	}

	if (comments.length <= 0) {
		comments.push(<Comment content="There are no comments on this question"/>);
	}

	return (<>
		<div className="c-container">
			{comments}
		</div>
	</>)
}

function GetQuestionDetails(questionId, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers) {
	fetch(`http://localhost:8080/getQuestion/${questionId}`)
	.then(res => res.json())
	.then((data) => {
		setUsername(data.author_username);
		setProfilePicture(data.pfp_img || logo);
		setTitle(data.title);
		setDate(data.date);
		setDetails(data.details);
		setAnswers(data.answers);
	})
}

function GetComments(questionId, setComments) {
	fetch(`http:localhost:8080/getComments/${questionId}`).then(res => res.json())
	.then((data) => {
		setComments(data);
	})
}

export function QuestionDisplay() {
	const [usrnm, setUsername] = useState("Loading...");
	const [pfp, setProfilePicture] = useState(logo);
	const [tle, setTitle] = useState("Loading...");
	const [dte, setDate] = useState("00/00/0000");
	const [dtls, setDetails] = useState("Loading...");
	const [anwers, setAnswers] = useState({});
	const [cmnts, setComments] = useState({});
	const [imode, setInteractionMode] = useState(0);

	const match = useMatch("/question/:questionId");
	useEffect(() => {
		//GetQuestionDetails(match.params.questionId, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers);
		//GetComments(match.params.questionId, setComments)
	}, [match, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers, setComments]);

	return (<div className="all-content">
		<div className="main-content">
			<QuestionContent username={usrnm} userimg={pfp} title={tle} date={dte} details={dtls} />
			<AnswersSection content={testAnswers} />
		</div>
		<div className="comment-content">
			<Comments content={testComments}/>
		</div>
	</div>);
}