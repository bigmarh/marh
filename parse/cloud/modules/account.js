Parse.Cloud.define("account_buildAddress", function(req,res){
	var keychain = [];

	function getOrg(){
		var query =  new Parse.Query('Organization');
		query.equalTo('objectId',req.params.org);
		query.first().then(function(org){
			org.get('payload').fetch().then(function(payload){
				var keychainObj = {
					owner: org.id,
					type:"org",
					xpub: org.get('xpub');
				};
				keychain.push(keychainObj);
			})
		})}

	function getSignees(){
		
	}

	 function next() {
        if (!fns.length) res.success(keychain);
        return fns.shift()();
      }
	
}) 