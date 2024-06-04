const express = require('express');
const Item = require('../models/item.model');
const User = require('../models/user.model');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Change password
router.patch('/users/:id/password', auth, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        user.password = req.body.password;
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update user information
router.patch('/users/:id', auth, admin, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'isAdmin'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }

        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete user
router.delete('/users/:id', auth, admin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Initialize/repopulate the database
router.post('/init', auth, admin, async (req, res) => {
    try {
        await Item.deleteMany({});
        await User.deleteMany({});
        res.send('Database initialized.');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
