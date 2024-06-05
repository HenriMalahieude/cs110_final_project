require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require('./config/passport');

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const itemsRouter = require('./routes/items');

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/items', itemsRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the CS110 Final Project Backend!");
});

app.get("/getQuestionBoard", (req, res) => {
    console.log("Getting Questions in a Nice JSON format!");
    res.status(200).send("TODO");
});

app.get("/getProfile/:username", (req, res) => {
    console.log("Getting a user known as " + req.params.username);
    res.status(200).send("TODO");
});

app.get("/getQuestion/:questionId", (req, res) => {
    console.log("Getting question w/ id: " + req.params.questionId);
    res.status(200).send("TODO");
});

app.get("/getComments/:questionId", (req, res) => {
    console.log("Getting comments attached to question w/id: " + req.params.questionId);
    res.status(200).send("TODO");
});

app.post("/createQuestion", (req, res) => {
    console.log("Asked to create question with specified info:");
    console.log(req.body);
    res.status(200).send("TODO");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, 
    console.log(`Server started on port ${PORT}`)
);
