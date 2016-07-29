const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
var Fuse = require('fuse.js');
//enter the name of the module here .
var menusModule = require('./bookInventory.js');
var booksOnHand = menusModule.booksOnHand;
const app = express();
var db;

// var booksOnHand = [

// 	{
// 		"author" : "Dan Brown",
// 		"name" : "Angels and Demons",
// 		"yearPublished" : "2001"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Lord of the Rings the fellowship of the Ring",
// 		"yearPublished" : "1989"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Lord of the Rings the Two Towers",
// 		"yearPublished" : "1991"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Lord of the Rings, Return of the King",
// 		"yearPublished" : "1992"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Harry Potter and the Sorcerer Stone",
// 		"yearPublished" : "2001"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Harry Potter and the Chambers of Secrets",
// 		"yearPublished" : "2002"
// 	},
// 	{
// 		"author" : "J.R Tolken",
// 		"name" : "Harry Potter and the Prisoner of Azaban",
// 		"yearPublished" : "2003"
// 	}

// ];

var options = {
	keys: ['author', 'name', 'yearPublished'],
	caseSensitive: false
}


//enter the name of the database here.
MongoClient.connect('mongodb://localhost:27017/Books',function(err, database) {
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

app.post('/search', function(req, res) {
	MongoClient.connect('mongodb://localhost:27017/Books',function(err, db) {
		if(err)
			return console.log(err);

	var searchString = req.body.name;
	// //enter the name of the collection here.
	// var returnCursor = db.collection('inventory').find().toArray();
	// console.log("=========================================");
	// console.log("found " );
	// printjson (returnCursor[0]);
	var fusionObject = new Fuse(booksOnHand,options);
    var result = fusionObject.search(searchString);

 		// for(var j = 0; j < returnCursor.length; j++) {
 		// 	console.log(returnCursor[j]);
 		// }

 		

    for(var i = 0; i < result.length; i++) {
    	console.log(result[i]);
    }
    });
	
});

