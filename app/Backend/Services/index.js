module.exports = function(app, Parse){

	require('./BlockCypherService')(app, Parse);
	require('./UtilService')(app, Parse);
	require('./TransactionService')(app, Parse);
	require('./WalletService')(app, Parse);
	require('./LastSign')(app, Parse);
	require('./AccountsService')(app, Parse);
	require('./AppService')(app, Parse);
	require('./GoogleService')(app, Parse);
	require('./OrgService')(app, Parse);

}