const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
var Fuse = require('fuse.js');
//enter the name of the module here .
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
	var searchString = req.body.name;
	console.log("this is what the user searched ", searchString);
	db.collection('inventory').find({}).toArray(function(err, results) {
		if(err) 
			console.log(err);
		console.log(results);

	});
	// for(var i = 0; i < results; i++)
	// 	console.log(results[i]);
	// console.log("end of the while loop")
    /*
    //This finds a book, when the user enters the name of the book.
	var fusionObject = new Fuse(booksOnHand,options);
    var results = db.collection('inventory').findOne({name: searchString})
    	.then(function(items) {
    		console.log(items);
    		callback(items);
    	});
    */	
    //var output = fusionObject.search(searchString);

   
});

