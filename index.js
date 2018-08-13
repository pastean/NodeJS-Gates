//SERVER
var path = require('path')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var port = process.env.PORT || 8000

//GPIO
var GPIO = require("onoff").Gpio

//SOCKETIO
var io = require('socket.io')(server)

//SASS
var sass = require('node-sass')

//SERVER SETUP
app.use(express.static(path.join(__dirname, 'public')));
sass.render({
	file: '/public/style.scss',
	outFile: '/public/style.css',
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
	console.log('user connected')
	socket.on('mainGateButtonClick', () => {
		 outputSequence(7, '10', 1000);

		 // var date = date.getDate(); //date as a number 1-31
		 // var day = date.getDay(); //day as a number 0-1
		 //
		 var date = new Date;
		 var hours = date.getHours(); // 0-23
		 var minutes = date.getMinutes();
		 var hoursMinutes = hours + ":" + minutes;
		 console.log('hoursminutes', hoursMinutes);
	})

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
})

//GPIO FUNCTIONS
// function outputSequence(pin, seq, timeout) {
//      var gpio = new GPIO(4, 'out');
//      gpioWrite(gpio, pin, seq, timeout);
// }
//
// function gpioWrite(gpio, pin, seq, timeout) {
//      if (!seq || seq.length <= 0) {
//           console.log('closing pin:', pin);
//           gpio.unexport();
//           return;
//      }
//
//      var value = seq.substr(0, 1);
//      seq = seq.substr(1);
//      setTimeout(function() {
//           console.log('gpioWrite, value:', value, ' seq:', seq);
//           gpio.writeSync(value);
//           gpioWrite(gpio, pin, seq, timeout);
//      }, timeout);
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
});

server.listen(port, function() {
     console.log('Server listening on port', port);
});
