const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const port = process.env.PORT || 3000;

// define route
const articleRoute = require('./api/routes/articles-routes');
const imageRoute = require('./api/routes/image-routes');
const userRoute = require('./api/routes/user-routes');
const memberRoute = require('./api/routes/member-routes');
const depositRoute = require('./api/routes/deposit-routes');
const creditRoute = require('./api/routes/credit-routes');
const bookkeepingRoute = require('./api/routes/bookkeeping-routes');
// const creditRoute = require('./api/routes/credit-routes');
// const bookkeepingRoute = require('./api/routes/bookkeeping-routes');

// domain url
const url = 'https://damo-express-server.herokuapp.com/';
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

// connect mongodb
mongoose.connect(
    'mongodb://damocolos:damocolos@blog-shard-00-00-q6tv7.mongodb.net:27017,blog-shard-00-01-q6tv7.mongodb.net:27017,blog-shard-00-02-q6tv7.mongodb.net:27017/blog?ssl=true&replicaSet=Blog-shard-0&authSource=admin', 
    // 'mongodb://127.0.0.1:27017/restapi',
	{
  		useMongoClient: true,
  		/* other options */
	}
);

mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
	res.status(200).json({
		name: "DAMO SERVER",
		version: "1.0.0",
		framework: "express"
	});
});

app.use('/api/articles', articleRoute);
app.use('/user', userRoute);
app.use('/api/members', memberRoute);
app.use('/api/deposits', depositRoute);
app.use('/api/credits', creditRoute);
app.use('/api/bookkeepings', bookkeepingRoute);

// didn't work yet
app.use('/image', imageRoute);

app.listen(port);
console.log('running on port ' + port);