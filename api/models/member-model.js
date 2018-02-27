var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nik: String,
	name: String,
    gender: String,
    address: String,
    city: String,
    email: String,
    last_salary: Number,
    salary_date: Date,
    out_date: Date,
    management: Boolean,
    credits: [{ type: mongoose.Schema.ObjectId, ref: 'credits' }],
    deposits: [{ type: mongoose.Schema.ObjectId, ref: 'deposits' }],
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('members', schema);

// module.exports.getArticles = function(callback) {
// 	Article.find(callback);
// 	// console.log(Article.find());
// }