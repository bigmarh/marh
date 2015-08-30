module.exports = function(params) {
    var Bitcore = $pa.core.bitcore;
    var BitcoreMnemonic = $pa.core.bitcoreMnemonic;
    var CryptoJS = $pa.core.cryptojs;

    var payload = {

        pin: '',
        encryptedPin: '',
        passwordEncKey: '',

        setPasswordEncryptionKey: function() {
            this.passwordEncKey = Bitcore.encoding.Base58(Bitcore.crypto.Random.getRandomBufferBrowser(18)).toString();
        },

        setPin: function(pin) {
            this.pin = pin;
        },

        encryptPin: function() {
            this.encryptedPin = CryptoJS.AES.encrypt(this.pin, this.passwordEncKey);
        },

        generateCardNumber: function() {
            this.cardNumber = "";
            var pool = "0123456789";
            var length = 25;
            for (var i = 0; i < length; i++)
               this.cardNumber += pool.charAt(Math.floor(Math.random() * pool.length));
        },

        generateKeys: function() {
            this.mnemonic = new BitcoreMnemonic(BitcoreMnemonic.Words.ENGLISH);
            this.hdPrivateKey = this.mnemonic.toHDPrivateKey();
            this.hdPublicKey = this.hdPrivateKey.xpubkey;
        },

        printPayload: function() {
            console.log("Card Number:", this.cardNumber);
            console.log("PIN:", this.pin);
            console.log("Password Encryption Key:", this.passwordEncKey);
            console.log("Encrypted PIN:", this.encryptedPin.toString());
            console.log("User Private Key:", this.hdPrivateKey.toString());
            console.log("User Public Key:", this.hdPublicKey);
        }

    }

    return payload;
}
