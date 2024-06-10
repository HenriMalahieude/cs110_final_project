const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.get("/getProfile/:username", async (req, res) => {
    console.log("Getting a user known as " + req.params.username);
    try {
        const user = await User.find({username: req.params.username});
        if(!user){
            return res.status(404).send("User Does not exist");
        }
        res.json(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
