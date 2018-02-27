var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    member: { type: mongoose.Schema.ObjectId, ref: 'members' },
	type: String,
    amount: Number,
    desc: String,
    interest: Number,
    time_periods: Number,
    details: [{ type: mongoose.Schema.ObjectId, ref: 'credits_detail' }],
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('credits', schema);