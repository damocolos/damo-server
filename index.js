const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const url = 'http://localhost:3000/';
const uploadPath = 'uploads/';

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().getMilliseconds() + file.originalname);
	}
});

const upload = multer({
	storage: storage
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// cors
app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
	if(req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

Article = require('./api/models/articles-models');
const articleRoute = require('./api/routes/articles-routes');
const imageRoute = require('./api/routes/image-routes');

// connect mongodb
mongoose.connect(
	'mongodb://damocolos:damocolos@blog-shard-00-00-q6tv7.mongodb.net:27017,blog-shard-00-01-q6tv7.mongodb.net:27017,blog-shard-00-02-q6tv7.mongodb.net:27017/blog?ssl=true&replicaSet=Blog-shard-0&authSource=admin', 
	{
  		useMongoClient: true,
  	/* other options */
	}
);

mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
	res.send('hello world!');
});

app.use('/api/articles', articleRoute);
app.use('/image', imageRoute);

// app.get('/api/articles', function(req,res){
// 	Article.getArticles(function(err, articles){
// 		if(err){ 
// 			// console.log(err);
// 			// res.json(err);
// 			throw err;
// 		}
// 		res.status(200).json(
// 			articles.map(data => {
// 				return {
// 					title: data.title,
// 					image: data.image,
// 					image_path: url + uploadPath + data.image,
// 				}
// 			})
// 		);
// 	});
// 	// mongoose.articles.find();
// })

// app.post('/api/articles', upload.single('imageFile'), (req, res, next) => {
// 	console.log("request file", req.file);
// 	const article = new Article({
// 		_id: new mongoose.Types.ObjectId(),
// 		title: req.body.title,
// 		image: req.file.filename
// 	});	
// 	article.save()
// 	.then( result => {
// 		console.log("result", result);
// 	})
// 	.catch(err => console.log("error", err));
// 	res.status(201).json({
// 		message: "Handling POST",
// 		article: article
// 	});
// })

app.listen(3000);
console.log('running on port 3000');