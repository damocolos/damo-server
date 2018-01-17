var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Article = require('./app/articles');


// connect mongodb
mongoose.connect(
	'mongodb://damocolos:damocolos@blog-shard-00-00-q6tv7.mongodb.net:27017,blog-shard-00-01-q6tv7.mongodb.net:27017,blog-shard-00-02-q6tv7.mongodb.net:27017/blog?ssl=true&replicaSet=Blog-shard-0&authSource=admin', 
	{
  		useMongoClient: true,
  	/* other options */
	}
);

app.get('/', function(req, res) {
	res.send('hello world!');
});

app.get('/api/articles', function(req,res){
	Article.getArticles(function(err, articles){
		if(err){ 
			// console.log(err);
			// res.json(err);
			throw err;
		}
		res.json(articles);
	});
	// mongoose.articles.find();
})

app.post('/api/articles', function(req, res, next){
	console.log("request",req.body);
	const article = new Article({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		image: req.body.image
	});	
	article.save()
	.then( result => {
		console.log("result", result);
	})
	.catch(err => console.log("error", err));
	res.status(201).json({
		message: "Handling POST",
		article: article
	});
})

app.listen(3000);
console.log('running on port 3000');