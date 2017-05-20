var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var hbs = require('express-handlebars');

const PORT = 3000;

app.engine('hbs', hbs({extname: 'hbs', layoutsDir: __dirname + '/public/layouts'}));
app.set('views', path.join(__dirname, "public"));
app.set('view engine', 'hbs');

var LAN = {};
var userdata = {};

app.get('/', function(req, res) {
	var ip =  req.ip;
	console.log('User Requesting Access, IP: ' + ip);
	res.render('index', { localip: ip.substring(ip.lastIndexOf(':')+1, ip.length) });
});

app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket) {
	console.log('User ' + socket.id + ' Connected');
	socket.on('chat message', function(usr, msg) {
		console.log('Message recieved from ' + socket.id);
		io.emit('chat message', usr, msg);
	});
	socket.on('disconnect', function() {
		console.log('User ' + socket.id + ' Disconnected');
	});
});

http.listen(PORT, function() {
	console.log('Listening on *:' + PORT);
});