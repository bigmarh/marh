module.exports= function(app, Parse){
	require('./home')(app, Parse);
	require('./register')(app, Parse);

}