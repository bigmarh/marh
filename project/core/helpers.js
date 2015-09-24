module.exports = function(Parse, app) {
    var MoneyMath = loadLibrary('moneyMath');

    return {
        hDoc: function(f) {
            return f.toString().
            replace(/^[^\/]+\/\*!?/, '').
            replace(/\*\/[^\/]+$/, '');
        },
        loader: function(state, message) {

            var currentState = {
                show: function(message) {
                    ee.emit('showLoader', message)
                },
                hide: function(message) {
                    ee.emit('hideLoader', message)
                },
                message: function(message) {
                    ee.emit('loaderMessage', message)
                }
            }[state];

            return currentState(message);
        },
        loadStyle: function(component) {
            try {
                var style = $pa.helpers.hDoc(component.style);

                //if same element don't reload or if no style
                if (document.getElementById(component.name + "-style") || style.search(
                        "function") >
                    -1)
                    return;
                //build styleElement
                var styleEl = document.createElement('style');
                styleEl.id = component.name + "-style";
                var text = document.createTextNode(style);
                styleEl.appendChild(text);

                // document.getElementsByTagName("head")[0].insertBefore(styleEl,
                //   document.getElementsByTagName("head")[0].firstChild);
                document.getElementsByTagName("head")[0].appendChild(styleEl)
            } catch (e) {
                console.error(e);
            }

        },
        unloadStyle: function(component) {
            if (document.getElementById(component.id))
                document.getElementsByTagName("head")[0].removeChild(document.getElementById(
                    component.name + "-style"));
        },
        fileName: function(filename) {
            return filename.split('/').pop().split('.')[0];
        },
        dirName: function(dirName) {
            return dirName.split('/').pop();
        },
        loadApps: function(blocks) {
            //load apps
            if (!blocks.apps) m.mount(document.body,
                "No apps. No Happs! Add an application to you app folder");
            Object.keys(blocks.apps).map(function(key) {
                blocks.apps[key](Parse, app);
            });
        },
        isFn: function(f) {
            return !!(f && f.call && f.apply);
        },
        location: function(path) {
            window.location = path;
        },
        routeHandler: function() {

        },
        buildPointer: function(className, objectId) {
            return '{ "__type": "Pointer", "className": "' + className + '", "objectId": "' + objectId + '" }';
        },
        formatDate: function(date) {
            var month = this.getMonthThreeLetter(date.getMonth());
            date = month + ' ' + date.getDate();
            return date;
        },
        getMonthThreeLetter: function(month) {
            var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
            return monthNames[month];
        },

        /**
         * @param  {int}        number
         * @param  {string}     digits/letters/digits-letters
         * @return {string}     text consisting of random characters
         */
        generateToken: function(number, type) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*!@";
            if (type == "digits") possible = "0123456789";
            if (type == "letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            if (type == "digits-letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < number; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },

        getCurrentSessionToken: function() {
            if (Parse.User.current()) {
                return Parse.User.current().getSessionToken();
            }
            return $User.sessionToken ? $User.sessionToken : '';
        },

        /**
         * @description Allows for local storage of an object
         * @example:$pa.helpers.setLocalObject('user', userObject)
         * @param {string} key  The key of the stored object
         * @param {object} value The object being stored
         */
        setLocalObject: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        /**
         * @description Allows for retrieval of an object from storage
         * @example:$pa.helpers.getLocalObject('user'); 
         * @param {string} key  The key of the stored object
         */
        getLocalObject: function(key) {
            var value = localStorage.getItem(key);
            return value && JSON.parse(value);
        },

        trimWords: function(theString, numWords) {
            expString = theString.split(/\s+/, numWords);
            theNewString = expString.join(" ");
            return theNewString;
        },

        convertToFiat: function(amount, currencyType) {
            var MoneyMath = $load.library('moneyMath');
            if (currencyType) {
                /**
                 * @todo take care of this
                 */
            }
            if (!amount) {
                return "$0.00";
            }
            return MoneyMath.dollarFormat(MoneyMath.numberToAmount(amount));
        },

        preventInput: function() {
            var btns = document.getElementsByClassName("requestBtn");
            for (i = 0; i < btns.length; i++) {
                btns[i].style.pointerEvents = "none";
            }
            var links = document.getElementsByClassName("requestLink");
            for (i = 0; i < links.length; i++) {
                links[i].style.pointerEvents = "none";
            }
        },

        enableInput: function() {
            var btns = document.getElementsByClassName("requestBtn");
            for (i = 0; i < btns.length; i++) {
                btns[i].style.pointerEvents = "auto";
            }
            var links = document.getElementsByClassName("requestLink");
            for (i = 0; i < links.length; i++) {
                links[i].style.pointerEvents = "auto";
            }
        },

        /**
         * @description Returns a string stripped of non-numeric input
         * @param {string} string to be modified
         * @return {string} string with no non-numeric input
         */

        removeNonNumeric: function(str) {
            if (str) {
                var newString = str.replace(/[^0-9.]/g, "");
                return newString;
            } else
                return "";
        },

        /**
         * @description Formats an amount string to be in US dollars format
         * @param  {string or int} amount The monetary  string amount to be formatted
         * @return {string}        The US dollars formatted string
         */
        dollarFormat: function(amount) {
            //first, check if tax is == 0.0
            if(amount === "0.0")
                amount = "0.00";
            if (typeof amount == "number") {
                amount = amount.toFixed(2);
            }
            try {
                return MoneyMath.dollarFormat(amount);
            } catch (err) {
                console.log(MoneyMath);
                return amount;
            }
        },

        /**
         * @description Formats a float value to be in money math format ("##.##")
         * @param  {number} amount   The float amount to be formatted
         * @return {string}         The decimal format string
         */
        floatToAmount: function(amount) {
            try {
                return MoneyMath.pkg.floatToAmount(amount);
            } catch (err) {
                console.log(err);
                return amount;
            }
        },

        /**
         * Format the transfer amount so that it's in pennies. If there's a decimal,
         * we just remove it and have it all in pennies already.
         * @param  {string} amount  The amount to convert to pennies
         * @return {float}          The amount in pennies                
         */
        amountToPenny: function(amount) {
            try {
                this.amount = this.floatToAmount(parseFloat(amount).toFixed(2));
                return parseFloat(this.amount.replace(".", ""));
            } catch (err) {
                console.log(err);
                return amount
            }
        },

        isValidEmail: function(email) {
            var regEx = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            return regEx.test(email);
        }

    }
}
