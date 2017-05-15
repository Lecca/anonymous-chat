var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.sendFile('main.html', { root: path.join(__dirname, 'public') });
});

app.get('/bad', function(req, res) {
	res.sendFile('bad.html', { root: path.join(__dirname, 'public') });
});

io.on('connection', function(socket) {
	console.log('connected');
	socket.on('disconnect', function() {
		console.log('disconnect');
	});
});

http.listen(3000, function() {
	console.log('listening');
});