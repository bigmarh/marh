module.exports= function(app, Parse){

	require('./dash/index.js')(app, Parse);
	require('./signup/index.js')(app, Parse);
	require('./windows/index.js')(app, Parse);
	require('./setUp/index.js')(app, Parse);
	
		
}