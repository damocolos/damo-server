const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Member = require('../models/member-model');
const Credits = require('../models/credit-model');
const Deposits = require('../models/deposit-model');

const url = 'https://damo-express-server.herokuapp.com/';

router.get('/', (req, res) => {
    Member.find()
        .populate('credits', Credits)
        .populate('deposits', Deposits)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    // Members.getArticles((err, articles) => {
    // 	if(err){ 
    // 		throw err;
    // 	}
    // 	res.status(200).json(
    // 		articles.map(data => {
    // 			return {
    // 				_id: data._id,
    // 				title: data.title,
    // 				image: data.image,
    // 				image_path: url + uploadPath + data.image,
    // 			}
    // 		})
    // 	);
    // });
    // mongoose.articles.find();
})

// router.post('/', auth, upload.single('imageFile'), (req, res, next) => {
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
// });

// router.delete('/:id', auth, (req, res, next) => {
// 	Article.remove({ _id: req.params.id })
// 		.exec()
// 		.then( result => {
// 			res.status(200).json({
// 				message: "article deleted"
// 			});
// 		})
// 		.catch( err => {
// 			res.status(500).json({
// 				error: err
// 			});
// 		});
// });


module.exports = router;