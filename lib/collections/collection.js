var createSchema = require('json-gate').createSchema,
    errors = require('../errors'),
    async   = require('async');

var plural = function (callback) {
    return function (err, res) {
        if (res && res.resources !== undefined) {
            res = res.resources;
        }
        return callback(err, res);
    };
};

var InnerCollection = function (id, collection, parent, schema) {
    var request = parent.request;
    this.get = function (innerCollection, callback) {
        request.authedRequest(
            request.getPath(collection, id, innerCollection), null, 'GET',
                true, plural(callback));
    };
    this.association = function (entity, callback) {
        var self = this;
        this.get(null, function (err, entObj) {
            if (err) {
                return callback(err);
            }
            else {
                var url_key = entity + '_url';
               // var guid_key = entity + '_guid';
                if (Object.has(entObj, url_key) ||
                    (Object.has(entObj, 'entity') &&
                        Object.has(entObj.entity, url_key))
                                                            ) {
                    var path = entObj[url_key] || entObj.entity[url_key];
                    request.authedRequest(request.buildURL(path), null,
                        'GET', true, callback);
                } else {
                    return callback('entity has no any ' +
                        entity +
                        ' URL attribute defined');
                }
            }
        });
    };
};

var Collection = function (collection, schema) {
    this.request = Collection.request;
    if (schema) {
        Object.values(schema, function (value) {
            value.required = true;
        });
        schema = {
            properties: schema
        };

        schema = schema && createSchema(schema);
    }

    this.get = function (id, callback) {
        var plural = typeof id === 'function';
        var page;

        if (! callback && ! plural) {
            return new InnerCollection(id, collection, this, schema);
        }

        if (plural) {
            callback = id;
            id = null;
            page = 1;
        }

        var finished = false,
            request = this.request,
            results = [];


        async.until(
            function () {
                return finished;
            },
            function (callback) {
            request.authedRequest(
                    request.getPath(collection, id),
                    page,  'GET', true,
                    function (err, result) {
                        if (err) {
                            return callback(err);
                        }

                        finished = ! result.next_url;
                        if (page) {
                            page += 1;
                        }
                        if (plural && (result.resources !== undefined)) {
                            results.add(result.resources);
                        } else {
                            results.add(result);
                        }

                        callback();
                    });
        }, function (err) {
                if (err) {
                    return callback(err);
                }
                callback(err, plural ? results : results[0]);
            });
    };

    this.getBy = function (query, callback) {
        this.get(function (err, result) {

            if (err) {
                return callback(err);
            }

            var match = result.find(query);

            callback(match ? null : new errors.NotFoundError(query), match);
        });
    };

    this.getByName = function (name, callback) {
        this.getBy(function (each) {
            return each.entity.name === name;
        }, callback);
    };

    this.create = function (body, callback) {
        if (schema) {
            try {
                schema.validate(body);
            } catch (err) {
                return callback(err);
            }
        }

        this.request.authedRequest(
            this.request.getPath(collection), null, 'POST', body, callback);
    };

    this.update = function (id, body, callback) {
        this.request.authedRequest(
            this.request.getPath(collection, id), null, 'PUT', body, callback);
    };

    this.delete = function (id, callback) {
        this.request.authedRequest(
            this.request.getPath(collection, id),
            null, 'DELETE', true, callback);
    };
};

module.exports = function (request) {
	Collection.request = request;
    return Collection;
};