const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Bookkeepings = require('../models/bookkeeping-model');

router.get('/', (req, res) => {
    Bookkeepings.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})


module.exports = router;