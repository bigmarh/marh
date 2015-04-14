module.exports= function(app, Parse){
	require('./register.js')(app, Parse);
	require('./chooseType.js')(app, Parse);
	require('./invite.js')(app, Parse);
	require('./companyReg.js')(app, Parse);
	
}