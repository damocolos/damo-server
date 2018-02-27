var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    credit: { type: mongoose.Schema.ObjectId, ref: 'credits' },
    amount: Number,
    date: Date
});

module.exports = mongoose.model('credits_detail', schema, 'credits_detail');