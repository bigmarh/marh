var express = require('express')
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist')));

http.listen(3402, function() {
  console.log('listening on *:3402');
});
