var express = require('express');

var contacts = require('./contacts.json');

var app = express();
var port = 8000;

app.get('/', function(req, res){
	res.send('exercise-3');
});

var contactsRouter = express.Router();

contactsRouter.route('/contacts').get(function(req, res){

	res.json(contacts);
});

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.use('/', contactsRouter);

app.listen(port, function(){
	console.log('Running on PORT: ', port);
})
