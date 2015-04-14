module.exports = function(app, Parse, LS){

	require('./GoogleService')(app, Parse);
	require('./UserService')(app, Parse);


}