const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
var Fuse = require('fuse.js');
var menusModule = require('./bookInventory.js');
var booksOnHand = menusModule.booksOnHand;
var url = 'mongodb://localhost:27017/Books';
const app = express();
var db;

//the keys for what to search.
var options = {
	keys: ['author', 'name', 'yearPublished'],
	caseSensitive: false
}

//enter the name of the database here.
MongoClient.connect(url,function(err, database) {
	if(err)
		return console.log(err);
	db = database;
	app.listen(8000, function() {
		console.log('listening on 8000');
	});
});

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/search', function(req, res) {
	var fusionObject;
	var searchString = req.body.name;
	console.log("this is what the user searched ", searchString);
	db.collection('inventory').find({}).toArray(function(err, results) {
		if(err) 
			console.log(err);
		//console.log(results);
		fusionObject = new Fuse(results, options);
		var output = fusionObject.search(searchString);
	    for(var i = 0; i < output.length; i++)
			console.log(output[i]);
	});   
});

