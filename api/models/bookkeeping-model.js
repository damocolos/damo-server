var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	type: String,
    amount: Number,
    date: Date,
    desc: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('bookkeepings', schema);