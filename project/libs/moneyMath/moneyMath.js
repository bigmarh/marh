module.exports = function(params) {

    var MoneyMath = require('money-math');

    var moneyMath = {

        pkg: MoneyMath,

        /**
         * @description Formats an amount string to be in US dollars format
         * @param  {string} amount The monetary  string amount to be formatted
         * @return {string}        The US dollars formatted string
         */
        dollarFormat: function(amount) {
            try {
                return "$" + MoneyMath.format("USD", amount);
            } catch (err) {
                console.log()
                return amount;
            }
        },

        /**
         * @description Converts a number to a decimal string format
         * @param  {number} number The number to be converted to a string
         * @return {string}        A string in the format of a decimal
         */
        numberToAmount: function(number) {
            return MoneyMath.floatToAmount(parseFloat(number));
        }

    }

    return moneyMath;
}
