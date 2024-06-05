import './question.css'
import logo from "../../NavBar/logo.svg"
import React from "react";
import { useState, useEffect } from 'react';
import { useMatch } from "react-router-dom";
import axios from 'axios';

//Expected Answer format in json form
/* const testAnswers = [
	{
		author_username: "Testing123",
		pfp_img: logo,
		date: Date.now(),
		content: "ahah",
	},
]

for (let i = 0; i < 12; i++) {
	testAnswers.push({
		author_username: "Testing123",
		pfp_img: logo,
		date: Date.now(),
		content: "ahah",
	});
}

const testComments = [
	{
		author_username: "testing123",
		date: Date.now(),
		content: "lorem ipsum small comment"
	},
]

for (let i = 0; i < 12; i++) {
	testComments.push({
		author_username: "testing123",
		date: Date.now(),
		content: "lorem ipsum small comment"
	});
} // */

function QuestionContent({token, localUsername, questionId, username, userimg, title, date, details, interactBool, setInteraction, addUsergen}) {
	let qc_interactive_display = interactBool ? "flex" : "none";
	const [textbox, setTextbox] = useState("");

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

	function CommentClick() {
		let localComment = {
			author_username: localUsername,
			date: Date.now(),
			content: (' ' + textbox).slice(1), //make copy
		}

		addUsergen(undefined, localComment);
		axios.post(`http://localhost:8080/post/${questionId}/comment`, {content: textbox}, config)
			 .then(() => {setTextbox(''); setInteraction(false);})
			 .catch((err) => {console.log(err)});
	}

	function AnswerClick() {
		let localAnswer = {
			author_username: localUsername,
			date: Date.now(),
			content: (' ' + textbox).slice(1), //make copy
		}

		addUsergen(localAnswer);
		axios.post(`http://localhost:8080/post/${questionId}/answer`, {content: textbox}, config)
			 .then(() => {setTextbox(''); setInteraction(false);})
			 .catch((err) => {console.log(err)});
	}

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

			<div className="qc-interactive" style={{display: qc_interactive_display}}>
				<textarea placeholder="Interact with post..." className="interaction-txtbox" onChange={(e) => {setTextbox(e.target.value)}} value={textbox}/>
				<div className="qci-button-container">
					<button className="new-comment-button" onClick={() => {CommentClick()}}>
						Add Comment
					</button>
					<button className="new-answer-button" onClick={() => {AnswerClick()}}>
						Add Answer
					</button>
				</div>
			</div>

			<div className="qc-interactbutton-container">
				<button className="interact-button" onClick={() => {setInteraction(!interactBool)}}>
					{!interactBool ? "Interact" : "Close"}
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
				<div className="qcp-date">{new Date(date).toString()}</div>
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
				<div className="cm-date">{new Date(date).toString()}</div>
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
		comments.push(<Comment key={0} content="There are no comments on this question"/>);
	}

	return (<>
		<div className="c-container">
			{comments}
		</div>
	</>)
}

function GetQuestionDetails(questionId, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers, setComments) {
	fetch(`http://localhost:8080/post/${questionId}`)
	.then(res => res.json())
	.then((data) => {
		setUsername(data.author_username);
		setProfilePicture(data.pfp_img || logo); //not sure how we gonna do this anymore
		setTitle(data.title);
		setDate(data.date);
		setDetails(data.details);
		setAnswers(data.answers);
		setComments(data.comments);
	})
}

export function QuestionDisplay({token, localUsername}) {
	const [usrnm, setUsername] = useState("Loading...");
	const [pfp, setProfilePicture] = useState(logo);
	const [tle, setTitle] = useState("Loading...");
	const [dte, setDate] = useState(0);
	const [dtls, setDetails] = useState("Loading...");
	const [anwers, setAnswers] = useState([]);
	const [cmnts, setComments] = useState([]);
	const [imode, setInteraction] = useState(false);

	const match = useMatch("/question/:questionId");
	useEffect(() => {
		GetQuestionDetails(match.params.questionId, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers, setComments);
	}, [match, setUsername, setProfilePicture, setTitle, setDate, setDetails, setAnswers, setComments]);

	function addUserGenLocal(answer, comment) {
		if (answer) {
			let nanwers = JSON.parse(JSON.stringify(anwers)); //create local copy
			nanwers.push(answer);

			setAnswers(nanwers);
		}

		if (comment) {
			let ncmnts = JSON.parse(JSON.stringify(cmnts))
			ncmnts.push(comment)

			setComments(ncmnts);
		}
	}

	return (<div className="all-content">
		<div className="main-content">
			<QuestionContent 
				token={token} 
				localUsername={localUsername} 
				questionId={match.params.questionId} 
				username={usrnm} 
				userimg={pfp} 
				title={tle} 
				date={dte} 
				details={dtls} 
				interactBool={imode} 
				setInteraction={setInteraction} 
				addUsergen={addUserGenLocal}/>
			<AnswersSection content={anwers} />
		</div>
		<div className="comment-content">
			<Comments content={cmnts}/>
		</div>
	</div>);
}