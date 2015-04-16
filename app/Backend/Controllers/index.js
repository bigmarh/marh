module.exports= function(app, Parse){

	require('./dash/index.js')(app, Parse);
	require('./windows/index.js')(app, Parse);
	require('./dash/inbox')(app, Parse);
	
		
}