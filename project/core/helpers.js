module.exports = function(Parse, app) {
    return {
        hDoc: function(f) {
            return f.toString().
            replace(/^[^\/]+\/\*!?/, '').
            replace(/\*\/[^\/]+$/, '');
        },
        loadStyle: function(component) {
            try {
                var style = $pa.helpers.hDoc(component.style);

                //if same element don't reload or if no style
                if (document.getElementById(component.name+"-style") || style.search(
                        "function") >
                    -1)
                    return;
                //build styleElement
                var styleEl = document.createElement('style');
                styleEl.id = component.name+"-style";
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
                    component.name+"-style"));
        },
        fileName: function(filename) {
            return filename.split('/').pop().split('.')[0];
        },
        dirName: function(dirName) {
            return dirName.split('/').pop();
        },
        loadApps: function(blocks) {

            //load apps
            if (!blocks) m.mount(document.body,
                "No apps. No Happs! Add an application to you app folder");
            Object.keys(blocks).map(function(key) {
                blocks[key](Parse, app);
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
        currentUserSetup: function() {
            if (!Parse.User.current()) return null;
            if (arguments.length == 1 && arguments[0] == 'save')
                return Parse.User.current().save().then(function(u) {
                    console.log(u)
                }, function(err) {
                    console.error(err)
                });
            if (arguments.length == 2) return Parse.User.current().set(
                arguments[
                    0],
                arguments[1]);
            if (arguments.length == 1) return Parse.User.current().get(
                arguments[
                    0]);
            return Parse.User.current();
        },
        buildPointer: function(className, objectId) {
            return '{ "__type": "Pointer", "className": "' + className + '", "objectId": "' + objectId + '" }';
        },
        formatDate: function(date) {
            var month = this.getMonthThreeLetter(date.getMonth());
            date = month + ' ' + date.getDay();
            return date;
        },
        getMonthThreeLetter: function(month) {
            var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
            return monthNames[month];
        },
        currentUserSetup: function() {
            if (!Parse.User.current()) return null;
            if (arguments.length == 1 && arguments[0] == 'save')
                return Parse.User.current().save().then(function(u) {
                    console.log(u)
                }, function(err) {
                    console.error(err)
                });
            if (arguments.length == 2) return Parse.User.current().set(
                arguments[
                    0],
                arguments[1]);
            if (arguments.length == 1) return Parse.User.current().get(
                arguments[
                    0]);
            return Parse.User.current();
        },
        
        /**
         * @param  {int}        number
         * @param  {string}     digits/letters/digits-letters
         * @return {string}     text consisting of random characters
         */
        generateToken: function(number, type) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*!@";
            if(type == "digits") possible = "0123456789";
            if(type == "letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            if(type == "digits-letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < number; i++)
               text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }

    }
}
