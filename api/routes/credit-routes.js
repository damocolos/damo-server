const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Credits = require('../models/credit-model');
const Members = require('../models/member-model');
const CreditDetails = require('../models/credit_detail-model');

router.get('/', (req, res) => {
    Credits.find()
        .populate('member', ['name', 'nik'], Members)
        .populate('details', CreditDetails)
        // .populate('detail', CreditDetails2)
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