var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	image: String
});

var Article = module.exports = mongoose.model('Articles', articleSchema);

module.exports.getArticles = function(callback) {
	Article.find(callback);
	// console.log(Article.find());
}