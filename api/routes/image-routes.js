const express = require('express');
const router = express.Router();
const gm = require('gm');
const fs = require('fs'); // To clean up after the we generate the output image file
const width = 300;
const height = 400;
const url = 'http://localhost:3000/';
const uploadPath = 'uploads/';
const Jimp = require("jimp");

router.get('/:i', (req, res) => {
	const { i } = req.params;

	console.log("cek", width);

	// gm(uploadPath + image)
	// .resize(width, height)
	// .write('/uploads/tmp.jpg', (err) => {
	// 	if(err)  {
	// 		console.log(err);
	// 	} else {
	// 		console.log('sendfile');
	// 		res.sendFile('/uploads/tmp.jpg');
	// 	}
	// });

	// 2nd attempt
	Jimp.read(uploadPath + i, (err, lenna) => {

		if (err) throw err;

		const file = uploadPath + width + height + i;
		console.log(file);
		lenna
			.resize(100, 200)            // resize
		    .quality(60)                 // set JPEG quality
		     // .greyscale()                 // set greyscale
		    .write(file)
		    .getBuffer( Jimp.AUTO, (err, file) => {
		    	console.log(file);
		    });

		res.end(lenna.bitmap.data);
	});

	// 3rd attemp
	// require('lwip').open(uploadPath + i, function(err, image){

 //  // check err...
 //  // define a batch of manipulations and save to disk as JPEG:
 //  image.batch()
 //    .scale(0.75)          // scale to 75%
 //    .rotate(45, 'white')  // rotate 45degs clockwise (white fill)
 //    .crop(200, 200)       // crop a 200X200 square from center
 //    .blur(5)              // Gaussian blur with SD=5
 //    .writeFile(uploads + 200 + 200 + uploadPath, function(err){
 //      // check err...
 //      // done.
 //    });

// });

		    // image.;

		// lenna.write(uploadPath + width + height + image);

	});

	// fs.unlinkSync('./tmp.jpg');
// })



module.exports = router;