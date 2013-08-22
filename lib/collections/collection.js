var createSchema = require('json-gate').createSchema;

var errors = require('../errors');

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
            request.getPath(collection, id, innerCollection), 'GET',
                true, plural(callback));
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

        if (! callback && ! plural) {
            return new InnerCollection(id, collection, this, schema);
        }

        if (plural) {
            callback = id;
            id = null;
        }

        this.request.authedRequest(
            this.request.getPath(collection, id), 'GET', true,
            function (err, result) {

            if (err) {
                return callback(err);
            }

            if (plural && (result.resources !== undefined)) {
                result = result.resources;
            }

            callback(null, result);
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
            this.request.getPath(collection), 'POST', body, callback);
    };

//         this.update = function (body, callback) {
//             authedRequest(getPath(collection, body[idField]), 'PUT', body,
//                     callback);
//         };

    this.delete = function (id, callback) {
        this.request.authedRequest(
            this.request.getPath(collection, id), 'DELETE', true, callback);
    };
};

module.exports = function (request) {
	Collection.request = request;
    return Collection;
};