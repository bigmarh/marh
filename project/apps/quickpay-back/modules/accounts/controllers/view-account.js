module.exports = function(module) {
    
    var controller = function() {
        this.account = m.prop();
        this.accountTransactions = m.prop();

        var self = this;

        module.$.models.Account.getAccount().then(function(account){
            self.account(account);
            m.redraw();
        });

        module.$.models.Account.getAccountTransactions().then(function(accountTransactions){
            self.accountTransactions(accountTransactions);
            m.redraw();
        });

    };

    return controller;
}