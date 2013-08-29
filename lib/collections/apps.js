var FormData = require('form-data');
//var Collection = require('./collection');

var VcapClientApps = function (request) {
    var Collection = require('./collection')(request);


    var apps = new Collection('apps', {
        name: { type: 'string' },
        space_guid: { type: 'string' }
    });

    apps.relations = ['space', 'stack', 'service_bindings', 'routes', 'events'];

    // --- MEMBER METHODS ----
    apps.summary = function (appId, callback) {
        apps.get(appId).get('summary', callback);
    };
    apps.stats  = function (appId, callback) {
        apps.get(appId).get('stats', callback);
    };
    apps.instances  = function (appId, callback) {
        apps.get(appId).get('instances', callback);
    };
    apps.crashes  = function (appId, callback) {
        apps.get(appId).get('crashes', callback);
    };
    apps.instanceFiles  = function (appId, instanceId, callback) {
        request.authedRequest(
            request.getPath('apps', appId, 'instances', instanceId, 'files'),
            null, 'GET', true, callback);
    };
   // apps.space  = function (appId, callback) {
   //     apps.get(appId).urlFor('space', callback);
   // };
    apps.relations.each(function (relation) {
        apps[relation] = function (appId, callback) {
            apps.get(appId).association(relation, callback);
        };
    });
    // --- UPADTE METHODSß
    apps.setRoute = function (appId, routeId, callback) {
        request.authedRequest(
            request.getPath('apps', appId, 'routes', routeId), null, 'PUT',
                true, callback);
    };

    apps.stop = function (id, callback) {
            apps.update(id, { state: 'STOPPED' }, callback);
        };

    apps.start = function (id, callback) {
            apps.update(id, { state: 'STARTED' }, callback);
        };

    apps.restart = function (id, callback) {
        var self = apps;
        apps.stop(id, function (err) {
            if (err) {
                return callback(err);
            }

            self.start(id, callback);
        });
    };

    apps.upload = function (guid, zipFile, callback) {
        var fileStream = typeof zipFile === 'string' ?
            require('fs').createReadStream(zipFile) :
            zipFile;

        var form = new FormData();
        form.append('application', fileStream,
            {contentType: 'application/zip'});
        form.append('_method', 'put');
        form.append('resources', '[]');

        form.getLength(function (err, length) {
            if (err) {
                return callback(err);
            }

            var req = request.authedRequest(request.getPath('apps', guid,
                    'bits'), null, 'PUT', true, callback);

            req.setHeader('Content-Length', length);
            req._form = form;
        });
    };

    return apps;
};

module.exports = VcapClientApps;