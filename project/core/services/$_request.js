module.exports = function(params, app, core) {
    /**
     * Creates a request wrapper that keeps track of request status and applys the neccessary
     * settings to make the request
     * @param  {object} opts An object containing request options
     * @example var opts = {
                method: "GET",
                url: apiUrl + "api/user"
            }
     * @return {function}  Returns a request wrapper function
     */
    var request = function(opts) {
        return new function() {
            self = this;
            self.opts = opts;
            self.success = self.loading = self.failed = false;
            self.errorStatus = self.errorBody = '';
            self.data = null;
            self.opts.background = true;
            self.opts.config = function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("sessionToken", $pa.helpers.getCurrentSessionToken());
                }
                //handle request errors
            self.opts.extract = function(xhr) {
                if (xhr.status >= 300) { // error!
                    m.startComputation();
                    self.failed = true;
                    self.success = self.loading = false;
                    $loader('hide');
                    self.errorStatus = xhr.status;
                    self.errorBody = xhr.responseText;
                    m.endComputation()
                }
                return xhr.responseText;
            }

            function log(value) {
                // console.log(value);
                return value;
            }
            /**
             * Initializes a request thread
             * @param  {Function}   fn      Success callback function
             * @param  {Function}   errorFn Error callback function
             * @return {Object}     Returns the requested objects 
             */
            self.start = function(fn, errorFn) {
                self = self;
                $loader('show');
                self.loading = true;
                self.success = self.failed = false;
                return m.request(self.opts).then(log)
                    .then(function(mydata) { // success!
                        m.startComputation();
                        $loader('hide');
                        self.success = true;
                        self.failed = self.loading = false;
                        self.data = mydata;
                        fn(self.data);
                        m.endComputation();
                    }, function(error) {
                        errorFn(error)
                    });
            }
        }()
    }

    return request;
}
