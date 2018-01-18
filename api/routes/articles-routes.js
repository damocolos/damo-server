const express = require('express');
const router = express.Router();
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

router.get('/', function(req,res){
	Article.getArticles(function(err, articles){
		if(err){ 
			// console.log(err);
			// res.json(err);
			throw err;
		}
		res.status(200).json(
			articles.map(data => {
				return {
					title: data.title,
					image: data.image,
					image_path: url + uploadPath + data.image,
				}
			})
		);
	});
	// mongoose.articles.find();
})

router.post('/', upload.single('imageFile'), (req, res, next) => {
	console.log("request file", req.file);
	const article = new Article({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		image: req.file.filename
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
});

module.exports = router;