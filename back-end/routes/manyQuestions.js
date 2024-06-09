const express = require('express');
const Question = require('../models/question.model');

const router = express.Router();

router.get("/getQuestions", async (req, res) => {
    console.log("Getting Questions in a Nice JSON format!");
    Question.find({})
    .then((q) => {res.status(200).json(q)})
    .catch((error) => {
        console.log(error);
        res.status(404).send(`Failed to retrieve questions: ${error}`)
    });
});
