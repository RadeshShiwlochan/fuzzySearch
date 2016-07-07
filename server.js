const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
var db;

MongoClient.connect('mongodb://localhost:27017/yoda',function(err, database) {
	if(err)
		return console.log(err);
	db = database;
	app.listen(3000, function() {
		console.log('listening on 3000');
	});
});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', function(req, res) {
	db.collection('quotes').save(req.body, function(err, result) {
		if(err)
			return console.log(err);
		console.log('saved to database');
		res.redirect('/');
	})
})

// app.listen(3000, function() {
// 	console.log("listening on 3000");
// });