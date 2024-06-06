const express = require('express');
const Question = require('../models/question.model');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get(':questionId', (req, res) => {
	Question.findById(req.params.questionId)
		.then((q) => {res.status(200).json(q)})
		.catch((err) => {
			console.log(err);
			res.status(404).send(`Could not locate question? (${err})`)
		});
});

router.post('/:questionId/comment', auth, (req, res) => {
	Question.findById(req.params.questionId).then((q) => {
		req.json().then((data) => {
			q.comments.push({
				author_username: req.user.username,
				content: data.content,
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
		}).then((err) => {
			console.log(err);
			res.status(401).send("Could not parse JSON?");
		});
	}).catch((err) => {
		console.log(err);
		res.status(404).send("Question didn't exist?");
	});
});

router.post('/:questionId/answer', auth, (req, res) => {
	Question.findById(req.params.questionId).then((q) => {
		req.json().then((data) => {
			q.answers.push({
				author_username: req.user.username,
				content: data.content,
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
		}).then((err) => {
			console.log(err);
			res.status(401).send("Could not parse JSON?");
		});
	}).catch((err) => {
		console.log(err);
		res.status(404).send("Question didn't exist?");
	});
});

router.post('/new', auth, (req, res) => {
	req.json().then(async (data) => {
		const adviceneed = new Question({
			author_username: req.user.username,
			title: data.title,
			content: data.content,
		})

		await adviceneed.save();
		res.status(200).json({questionId: adviceneed._id.toString()});
	}).catch((err) => {
		console.log(err);
		res.status(401).send("Question not posted. There was an error parsing your json?");
	})
})

module.exports = router;