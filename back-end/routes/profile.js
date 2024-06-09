const express = require('express');
const User = require('../models/question.model');

const router = express.Router();

router.get("/getProfile/:username", (req, res) => {
    console.log("Getting a user known as " + req.params.username);

});
