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
const singleQuestionRouter = require('./routes/question');

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/items', itemsRouter);
app.use('/post', singleQuestionRouter);

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, 
    console.log(`Server started on port ${PORT}`)
);
