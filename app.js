var express = require('express');
var path = require('path');
var Bunyan = require('bunyan');
var logger = Bunyan.createLogger({
    name: 'ws.server',
    streams: [{
        level: Bunyan.DEBUG,
        path: './log.log'
    }]
});


var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});

wss.on('connection', function(ws) {
    console.log('client connected');
    ws.on('message', function(message) {
        console.log(message);
    });
});

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  logger.debug('Express server listening on port ' + server.address().port);
});
 