module.exports= function(app, Parse){
	require('./menu/index.js')(app, Parse);
	require('./dash.js')(app, Parse);
	require('./apps/index.js')(app, Parse);
	require('./accounts/index.js')(app, Parse);
	require('./org/index.js')(app, Parse);
	require('./inbox/index.js')(app, Parse);
}