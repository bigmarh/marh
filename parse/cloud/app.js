
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});


app.get('/verified/:token/:userId', function(req, res) {

	var query = new Parse.Query('Verify_Token');
	query.equalTo('objectId',req.params.token);
	query.equalTo('userId',req.params.userId);
	query.first().then(function(token){
		if(!token){
			return res.render('notVerified', { message: 'There is something wrong with your verification'});
		}
		if(token.createdAt)


		res.render('verified', { message: 'Congrats, you\'re verified' });
	},function(err){
		return res.render('notVerified', { message: 'Congrats, you\'re verified' });
	})

 
});
app.post('/verified/:token/:userId', function(req, res) {

	var query = new Parse.Query('Verify_Token');
	query.equalTo('objectId',req.params.token);
	query.equalTo('userId',req.params.userId);
	query.first().then(function(token){
		if(!token){
			console.log(token)
			return res.render('notVerified', { message: 'Congrats, you\'re verified' });
		}
		res.render('verified', { message: 'Congrats, you\'re verified' });
	},function(err){
		res.render('verified', { message: 'Congrats, you\'re verified' });
	})

 
})

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();

module.exports = app;