module.exports = function(params) {
    var CryptoJS = require('crypto-js');
    var payload = {

        passwordEncKey: '',
        iv: '',

        generateCardNumber: function() {
            this.cardNumber = "";
            var pool = "0123456789";
            var length = 12;
            for (var i = 0; i < length; i++)
                this.cardNumber += pool.charAt(Math.floor(Math.random() * pool.length));
            return this;
        },

        setPasswordEncryptionKey: function() {
            this.passwordEncKey = bitcore.encoding.Base58(bitcore.crypto.Random.getRandomBufferBrowser(18)).toString();
            return this;
        },

        generateKeys: function() {
            this.mnemonic = new Bip39(Bip39.Words.ENGLISH);
            this.hdPrivateKey = this.mnemonic.toHDPrivateKey().derive("m/7'/7'");
            this.hdPublicKey = this.hdPrivateKey.hdPublicKey.toString();
            return this;
        },

        encryptPin: function(pin) {
            this.encryptedPin = CryptoJS.AES.encrypt(pin, this.passwordEncKey);
            this.iv = this.encryptedPin.iv.toString();
            return this;
        },

        decryptPrivateKey: function(privateKey, passwordEncKey, pin){
            //encrypt the pin to set the iv
            //use the iv to decrypt the privatekey

            this.passwordEncKey = passwordEncKey;
            this.iv = this.encryptPin(pin).iv.toString();
            console.log(this.iv);
            console.log(this.decrypt(privateKey, pin));
            return this.decrypt(privateKey, pin);
        },

        generateEncryptedContent: function(pin) {
            this.encryptedContent = this.encrypt(this.hdPrivateKey.toString(), pin);
            return this;
        },

        confirmPin: function(pin) {
            var decryptedOriginalPin = this.decrypt(this.encryptedPin, this.passwordEncKey);
            if (decryptedOriginalPin == pin)
                return true;
            return false;
        },
        
        printPayload: function() {
            // console.log("Card Number:", this.cardNumber);
            // console.log("Password Encryption Key:", this.passwordEncKey);
            // console.log("Password Encryption IV:", this.iv);
            // console.log("Encrypted PIN:", this.encryptedPin.toString());
            // console.log("User Public Key:", this.hdPublicKey);
            // console.log("User Private Key:", this.hdPrivateKey.toString());
            // console.log("User Encrypted Private Key:", this.encryptedContent.toString());
            // console.log("Mnemonic:", this.mnemonic.toString());
        },

        encrypt: function(string, key) {
            var encryptedString = CryptoJS.AES.encrypt(string, key, {
                iv: this.iv,
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            });
            return encryptedString.toString();
        },

        decrypt: function(string, key) {
            try { 
                var decryptedString = CryptoJS.AES.decrypt(string, key, {
                    iv: this.iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
            } catch (error) {
                return false;
            }
            return decryptedString;
        },

        buildRecoveryPdf: function() {
            this.PDFDocument = require('pdfkit');
            this.blobStream = require('blob-stream');
            this.recoveryPdf = new this.PDFDocument();
            this.stream = this.recoveryPdf.pipe(this.blobStream());

            this.recoveryPdf.fontSize(18).text('Card Number:').moveDown(.8);
            this.recoveryPdf.fontSize(12).text( payload.cardNumber ).moveDown(2.2);

            this.recoveryPdf.fontSize(18).text('Recovery Mneumonic:').moveDown(.8);
            this.recoveryPdf.fontSize(12).text( payload.mnemonic.toString() ).moveDown(2.2);

            this.recoveryPdf.fontSize(18).text('Encrypted PIN:').moveDown(.8);
            this.recoveryPdf.fontSize(12).text( payload.encryptedPin.toString() ).moveDown(2.2);

            return this;
        },

        downloadRecoveryPdf: function() {
            this.recoveryPdf.end();
            this.stream.on('finish', function() {
                payload.recoveryPdfBlob = payload.stream.toBlob('application/pdf');
                payload.a = document.createElement('a');
                payload.a.href = URL.createObjectURL(payload.recoveryPdfBlob);
                payload.a.download = "fluent-recovery.pdf";
                payload.a.click();
            });
        },

        retryDownload: function() {
            payload.a.click();
        }

    }

    return payload;
}