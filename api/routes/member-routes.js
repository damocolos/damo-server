const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Member = require('../models/member-model');
const Credits = require('../models/credit-model');
const Deposits = require('../models/deposit-model');

const url = 'https://damo-express-server.herokuapp.com/';

router.get('/', (req, res) => {
    Member.find()
        .populate('credits', Credits)
        .populate('deposits', Deposits)
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

// create new
router.post('/', (req, res, next) => {
    const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        nik: req.body.nik,
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        telp: req.body.telp,
        email: req.body.email,
        last_salary: req.body.last_salary,
        salary_date: req.body.salary_date,
        out_date: null,
        management: req.body.management,
        credits: [],
        deposits: [],
        created_at: new Date(),
        updated_at: new Date()
    });
    member.save();
    res.status(200).json(member);
});

// get single
router.get('/:id', (req, res, next) => {
    Member.findOne({
            _id: req.params.id
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// update
router.put('/:id', (req, res, next) => {
    Member.findById(req.params.id)
        .then((model) => {
            return Object.assign(model, req.body);
        }).then((model) => {
            return model.save();
        }).then((updatedModel) => {
            res.json({
                msg: 'model updated',
                updatedModel
            });
        }).catch((err) => {
            res.send(err);
        });
});

// delete
router.delete('/:id', (req, res, next) => {
    Member.remove({
            _id: req.params.id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;