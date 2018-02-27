var mongoose = require('mongoose');

var schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    member: { type: mongoose.Schema.ObjectId, ref: 'members' },
	type: String,
    amount: Number,
    desc: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('deposits', schema);

// module.exports.getArticles = function(callback) {
// 	Article.find(callback);
// 	// console.log(Article.find());
// }