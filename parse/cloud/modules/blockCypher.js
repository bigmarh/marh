Parse.Cloud.define('drip', function(req, res) {

    Parse.Cloud.httpRequest({
        method: "POST",
        url: req.params.url,
        body: JSON.stringify(req.params.postData),
        success: function(httpResponse) {
        res.success(httpResponse.text);
      },
      error: function(httpResponse) {
        res.success(httpResponse)
      }
    });



})
