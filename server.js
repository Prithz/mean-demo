var express 	= require('express'),
	app     	= express(),
	mongojs 	= require('mongojs'),
	bodyParser  = require('body-parser'),
	db 			= mongojs('mongodb://127.0.0.1:27017/lists', ['mycontacts']);
	

	
	app.use(bodyParser.json());
	app.use(express.static(__dirname+'/contact'));
	// Get the data from MongoDB
	app.get('/contactlists', function(req, res){		
		db.mycontacts.find( function(err, docs){
			res.json(docs);		
		});	
	
	});
	
	// Insert New Data to MongoDB
	app.post('/contactlists', function(req , res){
		console.log(req.body);		
		db.mycontacts.insert(req.body, function(err, docs){
			if (err) throw err;
			console.log(docs);
			res.json(docs);		
		});	
	});	
	
	
	//Delete the data  from MongoDB	
	app.delete('/contactlists/:id', function(req, res){
		var id  = req.params.id;			
		db.mycontacts.remove({ _id : mongojs.ObjectId(id) }, function(err, docs) {
			if(err) throw err;
			res.json(docs);		
		});	
	});
	
	// Update the data in MongoDB
	app.get('/contactlists/:id', function(req, res){
		var id  = req.params.id;
		db.mycontacts.findOne({ _id : mongojs.ObjectId(id) }, function(err, docs){
			if(err) throw err;
			res.json(docs);	
		});	
	});	
	
	app.put('/contactlists/:id', function(req, res){
		var id  = req.params.id;
		db.mycontacts.save({_id : mongojs.ObjectId(id), name : req.body.name, email:req.body.email, number:req.body.number }, function(err, docs){
			if(err) throw err;
			res.json(docs);			
		});	
	});
	
	
	
	app.listen(3000, function(){
		console.log('Server is running on port 3000');	 
	});
	
	
	
	