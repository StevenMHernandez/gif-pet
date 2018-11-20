const { execFile } = require('child_process');
const gifsicle = require('gifsicle');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const resizeWidth = 64;

var images = [];

fs.readdir("images/original", function(err, items) {
	images = items.filter((filename) => filename[0] != ".");
	console.log(images);

	images.forEach(function(filename) {
		execFile(gifsicle, ['--resize-fit-width', resizeWidth, '-o', 'images/resized/' + filename, 'images/original/' + filename], err => {
		  if (err) {
		    throw err;
		  }

		  console.log(filename + ' resized');
		});
	});
});


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/images', (req, res) => res.json(images));
app.use(express.static('images'));
app.use(express.static('node_modules'));

app.listen(port, () => console.log(`Server started on port ${port}!`));


