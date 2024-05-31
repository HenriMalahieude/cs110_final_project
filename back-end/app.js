require('dotenv').config(); //load a .env file into the server

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/getQuestionBoard", (req, res) => {
	console.log("Getting Questions in a Nice JSON format!");
	res.status(200).send("TODO");
})

app.get("/getProfile/:username", (req, res) => {
	console.log("Getting a user known as " + req.params.username);
	res.status(200).send("TODO");
})

app.get("/getQuestion/:questionId", (req, res) => {
	console.log("Getting question w/ id: " + req.params.questionId);
	res.status(200).send("TODO");
})

app.get("/getComments/:questionId", (req, res) => {
	console.log("Getting comments attached to question w/id: " + req.params.questionId);
	res.status(200).send("TODO");
})

app.use(express.json())
app.post("/createQuestion", (req, res) => {
	console.log("Asked to create question with specified info:");
	console.log(req.body);
	res.status(200).send("TODO");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, 
	console.log(`Server started on port ${PORT}`)
);