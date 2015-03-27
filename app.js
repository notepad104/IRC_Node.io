var express = require('express');
var app = express();
var eng = require('jade');
var socket = require('socket.io');
app.set('views', __dirname + '\\jade');
app.set('view engine', "jade");
app.engine('jade', eng.__express);
app.get('/', function (req, res) {
	res.render("page");
});

app.use(express.static(__dirname + '\\public'));

var io = socket.listen(app.listen(8000));
console.log("Listening on port 8000");
//sending and receiving messages
io.sockets.on('connection', function (socket){  
		//socket.emit('message', {message: 'User Connected'});
		socket.on('send', function (val){
			console.log(val);
			io.sockets.emit('message', val);
		});
});



