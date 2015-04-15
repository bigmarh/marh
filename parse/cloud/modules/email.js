var app = require('cloud/app.js');
Mandrill = require('mandrill');
Mandrill.initialize('gCmWFGNsFO6YnULxNMs6bw');

var Emails = {
    type: {},
    to: "",
    verificationToken: null,
    types: {
        verify_email: {
            template: 'mail-templates/verify.ejs',
            subject: "Welcome from Pheeva",
            from_email: "hello@pheeva.com",
            from_name: "Pheeva Enterprise Team",

        }
    },
    getVerificationToken: function(userId) {
        var self = this;
        var promise = new Parse.Promise();
        var Token = Parse.Object.extend('Verify_Token');
        token = new Token();
        this.userId = userId;
        token.save({
            userId: userId
        }).then(function(token) {
            self.verificationToken = token.id;
            promise.resolve(self);
        })

        return promise;
    },
    verification: function(to) {
        this.to = to;
        this.type = Emails.types['verify_email'];
        return this;
    },
    sendVerificationEmail: function(user) {
        Emails.getVerificationToken(user.id).then(function() {
            Emails.verification(user.get('email')).send();
        })
    },
    send: function(extra_data, success, error) {
        var self = this;
        if (!this.type.template_data) this.type.template_data = {};
        if (this.verificationToken) this.type.template_data.verificationToken = this.verificationToken;
        if (this.userId) this.type.template_data.userId = this.userId;
        if (extra_data) {
            for (var i = 0; i < Object.keys(extra_data).length; i++) {
                this.type.template_data[Object.keys(extra_data)[i]] = extra_data[Object.keys(extra_data)[i]]
            };
        }

        app.render(this.type.template, this.type.template_data, function(err, html) {
            console.log(err);
            Mandrill.sendEmail({
                message: {
                    html: html,
                    subject: self.type.subject,
                    from_email: self.type.from_email,
                    from_name: self.type.from_name,
                    to: [{
                        email: self.to,
                    }]
                },
                async: true
            }, {
                success: success,
                error: error
            });
        })
    }

}

module.exports = Emails;
