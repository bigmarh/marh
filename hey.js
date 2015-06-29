var express = require('express')
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));

http.listen(3400, function() {
    console.log('listening on *:3400');
});


var restify = require('restify');

var server = restify.createServer({
  name: 'MyApp',
});

function send(req, res, next) {
  res.json({message:'hello ' + req.params.name});
  return next();
}
server.get('/:name', send);

server.listen(8080);
