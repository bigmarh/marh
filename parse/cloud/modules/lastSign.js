 Parse.Cloud.define("registerLastSign", function(req, res) {


     function register() {
         Parse.Cloud.useMasterKey();
         postToLastSign('registerLastSign', null, function(result) {
            console.log("Save Last Sign for Account")
             var data = result.result;
             var LastSign = Parse.Object.extend('LastSign');
             var lastSign = new LastSign();

             var restrictedAcl = new Parse.ACL();
             restrictedAcl.setPublicReadAccess(false);
             restrictedAcl.setPublicWriteAccess(false);

             var LSObj = {
                 policy_updated: new Date(),
                 creds: data,
                 xpubkey: data.xpubkey
             }


             lastSign.set('current_policy', {
                     "__type": "Pointer",
                     "className": "Policy",
                     "objectId": req.params.policyId
                 } //add_defualt policy
             )
             console.log("Set current_policy")
             lastSign.setACL(restrictedAcl);
             lastSign.save(LSObj).then(function(ls) {
                 console.log("Return LSObj to client")
                 data.lastSign = ls.id;
                 res.success(data)
             }, function(err){
                console.log("There was an error");
                console.log(err);
             })


         }, res.error);
     }

     register();
 })
 Parse.Cloud.define("getlastSign", function(req, res) {


 })
 Parse.Cloud.define("getLSXpub", function(req, res) {
     Parse.Cloud.useMasterKey();
     var query = new Parse.Query('LastSign');
     query.equalTo('account', {
         "__type": "Pointer",
         "className": "Accounts",
         "objectId": req.params.account_id
     });

     query.first().then(function(ls) {
         console.log(ls);
         postToLastSign('getXpub', {
             creds: ls.get('creds')
         }, function(result) {
             console.log(result);
             res.success(result)
         }, function(error) {
             console.log(error)
             res.error(error)
         });
     })
 })

 Parse.Cloud.beforeSave("LastSign", function(request, response) {
     if (request.object.existed()) return response.success();
     response.success();

 });

 function setAccessbasedOnSignees() {

 }


 function postToLastSign(fn, body, cb, cbErr) {
    console.log("Post to LastSign")
     var reqObj = {
         url: 'https://api.parse.com/1/functions/' + fn,
         method: "POST",
         headers: {
             "X-Parse-Application-Id": "i9Ml1HXLEGndHJOB8YEogjRMi4A5BBSqtqzBNwnf",
             "X-Parse-REST-API-Key": "Eyj3wHh3GLp6ivh8zs0SYegElRv2MmEgn1KnG0ip",
             "Content-Type": "application/json"
         },
         success: function(httpResponse) {
            console.log("Created New Last Sign")
             cb(httpResponse.data);
         },
         error: function(httpResponse) {
             cbErr('Request failed with response code ' + httpResponse.status);
         }
     };

     if (body) {
         reqObj.body = body;
     }

     Parse.Cloud.httpRequest(reqObj);
 }
