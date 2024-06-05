const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	author_username: {type: String, required: true},
	title: {type: String, required: true},
	date: {type: Number, required: true, default: Date.now},
	contents: {type: String},

	answers: [{
		author_username: {type: String, required: true},
		date: {type: Number, required: true, default: Date.now},
		contents: {type: String, required: true},
	}],

	comments: [{
		author_username: {type: String, required: true},
		date: {type: Number, required: true, default: Date.now},
		contents: {type: String, required: true},
	}]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question