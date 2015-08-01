var express = require('express')
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));

http.listen(3400, function() {
  console.log('listening on *:3400');
});
