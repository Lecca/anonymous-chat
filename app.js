var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

const PORT = 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

io.on('connection', function(socket) {
	console.log('User ' + socket.id + ' Connected');
	socket.on('chat message', function(msg) {
		console.log('Message recieved from ' + socket.id);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		console.log('User ' + socket.id + ' Disconnected');
	});
});

http.listen(PORT, function() {
	console.log('Listening on *:' + PORT);
});