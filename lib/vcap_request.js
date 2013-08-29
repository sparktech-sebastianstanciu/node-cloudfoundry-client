var request = require('request'),
    url     = require('./url'),
    util    = require('util'),
    errors  = require('./errors');
var url     = require('url');

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
            method: method//,
            //json: json
        };

        if (json) {
            if ([ 'object', 'boolean' ].any(typeof json)) {
                options.json = json;
            } else {
                options.body = json;
            }
        }


        if (token) {
            options.headers = {
             //   Authorization: token
                Authorization: 'bearer ' + token
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
//            return callback(resp);
        });
    };

    this.getPath = function () {
        var path = [].slice.call(arguments).filter(function (each) {
            return each;
        }).join('/');

        return this.buildURL('v2/' + path);
    };

    this.buildURL = function (path) {
        return url.format({
            protocol: (info.protocol || 'http:'),
            hostname: info.host,
            pathname: path
        });
    };
    this.authedRequest = function (uri, page, method, json, callback) {
        var self = this;
        var loginAndRequest = function () {
            self.login(function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                return makeRequest(uri, null, method, json, callback);
            });
        };
        if (token) {
            return makeRequest(uri, page, method, json, callback);
        }

        loginAndRequest();
    };

    this.login = function (callback) {
        //debugger;
        request({
            url: url.toUaa('http://' + info.host) + 'oauth/token',
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;' +
                                'charset=utf-8',
                accept: 'application/json;charset=utf-8',
                authorization: 'Basic Y2Y6'
            },
            body: util.format('grant_type=password&username=%s&password=%s',
                      info.email, info.password)
        }, function (err, resp, body) {
            //debugger;
            if (!isSuccess(resp.statusCode)) {
                callback(errors.get(resp));
            }
            if (err) {
                return callback(err);
            }
            try {
                body = JSON.parse(body);
            } catch (err) {
                return callback(err);
            }

            token = body.access_token;
            callback(null, token);
        });
    };
};
module.exports = VcapRequest;