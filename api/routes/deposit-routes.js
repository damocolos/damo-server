const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Deposits = require('../models/deposit-model');

router.get('/', (req, res) => {
    Deposits.find()
        .populate('member', ['name', 'nik'])
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