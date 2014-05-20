// tools ===
var express  = require('express');
var app 	 = express();
var port 	 = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');
var http = require('http')

var configDB = require('./config/database.js');

// configuration ===
mongoose.connect(configDB.url); // connect our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application 
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	//required for passport
	app.use(express.session({ secret: 'kalechipsinkaledips'}));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ===
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// // sockets ===
// var	server	= require('http').createServer(app);
// var	io 		= require('socket.io').listen(server);
// io.sockets.on('connection', function (socket){

// 	function log(){
// 		var array = [">>> "];
// 	  for (var i = 0; i < arguments.length; i++) {
// 	  	array.push(arguments[i]);
// 	  }
// 	    socket.emit('log', array);
// 	}

// 	socket.on('message', function (message) {
// 		log('Got message: ', message);
// 		socket.broadcast.emit('message', message); // should be room only
// 	});

// 	socket.on('create or join', function (room) {
// 		var numClients = io.sockets.clients(room).length;

// 		log('Room ' + room + ' has ' + numClients + ' client(s)');
// 		log('Request to create or join room', room);

// 		if (numClients == 0){
// 			socket.join(room);
// 			socket.emit('created', room);
// 		} else if (numClients < 10) {
// 			io.sockets.in(room).emit('join', room);
// 			socket.join(room);
// 			socket.emit('joined', room);
// 		} else { // max two clients
// 			socket.emit('full', room);
// 		}
// 		socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
// 		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

// 	});

// });


app.use(express.static(__dirname + '/public'));
// server.listen(port);

// launch ===
app.listen(port);
//http.createServer(app).listen(process.env.PORT || 8001);
console.log('The magic happens on port ' + port);


/* === Credit === */
//http://scotch.io/tutorials/javascript/easy-node-authentication-linking-all-accounts-together