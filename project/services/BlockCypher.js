var BlockCypher;

module.exports = function(Parse) {

    BlockCypher = {

        /**
         * Get basic (or all with "full" param) info about an address' transaction
         * @param  {string} address The address to get
         * @param  {object} options Options to pass to BlockCypher API
         *         Options:
         *              {boolean}   full    Get all information about the address' transactions
         *              {int}       before  Get all transactions before a certain height inthe blockchain
         *              {int}       limit   Get only <limit> transactions
         * @return {object} Address data
         */
        getAddress: function(address, options) {

            var params = {
                address: address,
            }

            if (options) {
                for (key in options) {
                    params[key] = options[key];
                }
            }

            Parse.Cloud.run("BC_getAddress", params).then(function(response) {
                console.log(response);
                return response;
            });

        },

        /**
         * Get basic information about an address, including its balance in satoshis and 
         * the number of transactions associated with it. The endpoint omits any 
         * detailed transaction information.
         * @param  {string} address The address to get the balance of
         * @return {object} Address data
         */
        getBalance: function(address) {

            var params = {
                address: address,
            }

            Parse.Cloud.run("BC_getBalance", params).then(function(response) {
                console.log(response);
                return response;
            });

        },

        /**
         * Get detailed information about transaction based on its hash
         * @param  {string} transactionHash The transaction hash
         * @return {object} Transaction data
         */
        getTransaction: function(transactionHash) {
            var params = {
                transactionHash: transactionHash,
            }

            Parse.Cloud.run("BC_getTransaction", params).then(function(response) {
                console.log(response);
                return response;
            });
        },

        /**
         * Create a transaction. 
         * @param  {array} inputAddresses
         * @param  {array} outputs
         * @return {object} Transaction object     
         *
         * Structure example:
         *  var newtx = {
         *      //an array of input address(es)
         *      inputs: [{addresses: ['CEztKBAYNoUEEaPYbkyFeXC5v8Jz9RoZH9']}], 
         *      //an array of output objects consisting of an array of address(es) and values to pay
         *      outputs: [{addresses: ['C1rGdt7QEPGiwPMFhNKNhHmyoWpa5X92pn'], value: 100000}]
         *  };
         */
        buildTransaction: function(inputAddress, outputs) {
            var params = {
                inputAddresses: inputAddresses,
                outputs: outputs,
            }

            Parse.Cloud.run("BC_buildTransaction", params).then(function(response) {
                console.log(response);
                return response;
            });
        },

        /**
         * Create a multisig transaction
         * @param  {array} publicKeys   An array of publicKeys
         * @param  {int} m              multisig-(m)-of-n
         * @param  {int} n              multisig-m-of-(n)
         * @param  {array} outputs      An array of objects consisting of destination addresses and amounts they're to receive
         * @return {object}             Transaction object
         * 
         * Structure example:
         * var multisigData = {
         *      //an array of public keys and the script type
         *      inputs: [{"addresses": [pubkey1, pubkey2, pubkey3], "script_type": "multisig-2-of-3"}],
         *      //an array of objects consisting of a destination address and values to pay
         *      outputs: [{"addresses": [destAddr], "value": 150000}]
         * }
         */
        createMultiSigTransaction: function(publicKeys, m, n, outputs) {
            var params = {
                publicKeys: publicKeys,
                m: m,
                n: n,
                outputs: outputs,
            }

            Parse.Cloud.run("BC_createMultiSigTransaction", params).then(function(response) {
                console.log(response);
                return response;
            });
        },


        /**
		 * Propogate a transaction
		 * @param  {object} 	Transaction object
		 * @return {object}		Transaction object     
		 */
        pushTransaction: function(transactionObject){
        	var params = {
        		BC_tx: transactionObject
        	}
        	return Parse.Cloud.run("BC_pushTransaction", params).then(function(response) {
                return response;
            });
        },

        /**
         * Funds an address with blockcypher's faucet.
         * @param  {string} address The address to fund
         * @param  {int} 	amount  The amount the fund the account
         * @return {string}         Transaction reference
         */
        faucet: function(address, amount) {
            var params = {
                address: address,
                amount: amount,
            }

            Parse.Cloud.run("BC_faucet", params).then(function(response) {
            	console.log(response);
                return response;
            });

        },

        /**
         * Creates a hex signature for each of the passed toSign values.
         * @param  {array} toSigns    An array of toSign hex values
         * @param  {string} privateKey The private key
         * @return {string}            Hex string signature to sign a transaction with
         */
        signToSigns: function(toSigns, xPrivateKey, path) {
            return toSigns.map(function(toSign) {
                return bitcore.crypto.ECDSA.sign(new Buffer(toSign, 'hex'), bitcore.HDPrivateKey(xPrivateKey).derive(path).privateKey).toString("hex");
            })
        },

        /**
         * Sign the transaction
         * @param  {object} blockChainTransaction
         * @return {object}               Transaction Object
         */
        //maybe this should go in cloud code function?
        signTransaction: function(blockChainTransaction, path){
        	console.log("BlockCypher.signTransaction() called");

        	var toSigns = blockChainTransaction.tosign;

        	blockChainTransaction["signatures"] = this.signToSigns(toSigns, $User.current("keys").xprv, path);
            console.log("BCTX", blockChainTransaction);
            console.log(JSON.stringify(blockChainTransaction));
        	console.log("BCTXSig", blockChainTransaction["signatures"]);

        	return this.pushTransaction(blockChainTransaction);
        },

        signLastSign: function(blockChainTransaction, path){
        	console.log("signLastSign() called");
        	var toSigns = blockChainTransaction.tosign;
        	var self = this;
            
        	return Parse.Cloud.run("lastSign", null).then(function(keys){
	        	blockChainTransaction["signatures"] = self.signToSigns(toSigns, keys.xPrv, path);
                console.log("BCTX", blockChainTransaction);
                console.log(JSON.stringify(blockChainTransaction));
	        	console.log("BCTX Last Sign Sig", blockChainTransaction["signatures"]);

	        	return self.pushTransaction(blockChainTransaction);  		
        	});

        },
    }

    return BlockCypher;
}
