var express = require('express');

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
	let responseJson = {
		  data: [
			{
			  id: '123',
			  _links: '/people/123',
			},
			{
			  id: '124',
			  _links: '/people/124',
			},
			{
			  id: '125',
			  _links: '/people/125',
			}
		]
	};
	
	res.json(responseJson);
});

peopleRouter.route('/people/:id').get(function(req, res){
	let responseJson = {};
	
	if (req.params.id == 123){
		responseJson = {
			  data: {
				name: 'John Smith'
			 }
		};
		
		res.json(responseJson);
	}
	else if (req.params.id == 124){
		responseJson = {
			  data: {
				name: 'Joe Keith'
			 }
		};
		
		res.json(responseJson);
	}
	else if (req.params.id == 125){
		responseJson = {
			  data: {
				name: 'Sue Greens'
			 }
		};
		
		res.json(responseJson);
	}
	
	else {
		res.status(500);
	}
	
	res.json(responseJson);
});

app.use('/', peopleRouter);

app.listen(port, function(){
	console.log('Running on PORT: ', port);
})

