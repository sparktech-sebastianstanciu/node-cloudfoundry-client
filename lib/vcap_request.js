var request = require('request'),
    url     = require('url'),
    errors  = require('./errors');
    
var VcapRequest = function (info) {
    var token = info.token;

    var isSuccess = function (code) {
        return (code - (code % 200)) === 200;
    };

    //this.getPath = getPath;

    var makeRequest = function (uri, page, method, json, callback) {
        if (typeof json === 'function') {
            callback = json;
            json = true;
        }

        if (page) {
            uri += '?page=' + page;
        }

        var options = {
            uri: uri,
            method: method,
            json: json
        };

        if (token) {
            options.headers = {
                Authorization: token
            };
        }

        return request(options, function (err, resp, body) {
            if (err) {
                return callback(err);
            }

            if (isSuccess(resp.statusCode)) {
                return callback(null, body);
            }

            return callback(errors.get(resp));
        });
    };

    this.getPath = function () {
        var path = [].slice.call(arguments).filter(function (each) {
            return each;
        }).join('/');

        return url.format({
            protocol: (info.protocol || 'http:'),
            hostname: info.host,
            pathname: 'v2/' + path
        });
    };

    this.authedRequest = function (uri, page, method, json, callback) {
        if (token) {
            return makeRequest(uri, page, method, json, callback);
        }

        this.login(function (err) {
            if (err) {
                callback(err);
                return;
            }

            return makeRequest(uri, page, method, json, callback);
        });
    };

    this.login = function (callback) {
        makeRequest(
            url.toUaa('https://' + info.host),
            null, 'POST', { password:
            info.password }, function (err, result) {
            if (err) {
                return callback(err);
            }

            token = result.token;
            callback();
        });
    };
};
module.exports = VcapRequest;