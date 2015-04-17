module.exports= function(app, Parse){
	Parse.User.current() && Parse.User.current().fetch();
	require('./register')(app, Parse);

}