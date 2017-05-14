var express = require('express');
var people = require('./people.json');
var persons = require('./persons.json');

var app = express();
var port = 3000;

app.get('/', function(req, res){
	res.send('exercise-2');
});

var peopleRouter = express.Router();

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

peopleRouter.route('/people').get(function(req, res){
	
	res.json(people);
});

peopleRouter.route('/people/:id').get(function(req, res){
					
	let person = persons.find(function(element){
				return element.id === req.params.id;				
			});
			
	if(person != undefined){

		let responseJson = {
			  data: {
				name: person.name
			 }
		};
			 
		res.json(responseJson);
	}
	else {
		res.status(500)
			.send("Id does not exist: " + req.params.id);
	}
	
	
});

app.use('/', peopleRouter);

app.listen(port, function(){
	console.log('Running on PORT: ', port);
})

