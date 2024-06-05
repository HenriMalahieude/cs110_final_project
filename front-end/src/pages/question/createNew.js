import './new.css'
import './question.css'

import { useState } from "react";
import axios from 'axios';

export function QuestionCreation({token}) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	function Post() {
		if (title == undefined || title.length <= 0) return;
		if (content == undefined || content.length <= 0) return;

		let question = {
			title: title,
			content: content,
		}

		axios.post(`http://localhost:8080/post/new`, question, {header: {Authorization: `Bearer ${token}`}})
			 .then((data) => {
				window.location.href = `http://localhost:3000/question/${data.questionId}`;
			 })
			 .catch((err) => {
				console.log(err);
			 })
	}

	return (<>
		<div className="post-container">
			<div className="post-title">
				<div>Title: </div>
				<input type="text" placeholder="required" className="pt-txtbox" onChange={(e) => {setTitle(e.target.value)}} value={title} />
			</div>
			<textarea className="post-content-txtbox" onChange={(e) => setContent(e.target.value)} value={content} />
			<div className="post-confirm">
				<button onClick={(e) => {Post()}}>Post</button>
			</div>
		</div>
	</>);
}