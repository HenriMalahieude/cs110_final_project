const express = require('express');
const Question = require('../models/question.model');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/:questionId', (req, res) => {
	Question.findById(req.params.questionId)
		.then((q) => {res.status(200).json(q)})
		.catch((err) => {
			console.log(err);
			res.status(404).send(`Could not locate question? (${err})`)
		});
})

router.post('/:questionId/comment', auth, (req, res) => {
	Question.findById(req.params.questionId).then((q) => {
		q.comments.push({
			author_username: req.user.username,
			contents: req.body.content,
		})

		q.save().then((qq) => {
			if (qq == q) {
				res.status(200).send("Success");
			} else {
				res.status(500).send("Unknown Error occurred. Answer was not posted.");
			}
		}).catch((err) => {
			console.log(err);
			req.status(500).send("Comment could not be saved?");
		})
	}).catch((err) => {
		console.log(err);
		res.status(404).send("Question didn't exist?");
	});
});

router.post('/:questionId/answer', auth, (req, res) => {
	Question.findById(req.params.questionId).then((q) => {
		q.answers.push({
			author_username: req.user.username,
			contents: req.body.content,
		})

		q.save().then((qq) => {
			if (qq == q) {
				res.status(200).send("Success");
			} else {
				res.status(500).send("Unknown Error occurred. Answer was not posted.");
			}
		}).catch((err) => {
			console.log(err);
			req.status(500).send("Answer could not be saved?");
		})
	}).catch((err) => {
		console.log(err);
		res.status(404).send("Question didn't exist?");
	});
});

router.post('/new', auth, async (req, res) => {
	const adviceneed = new Question({
		author_username: req.user.username,
		title: req.body.title,
		contents: req.body.content,
	})

	await adviceneed.save();
	res.status(200).json({questionId: adviceneed._id.toString()});
})

module.exports = router;