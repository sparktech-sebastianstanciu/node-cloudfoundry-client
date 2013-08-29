var errors = require('../lib/errors');

require('sugar');

var assert = require('assert');

var host     = 'api.alpha.skynetinc.io',
    email    = 'admin',
    password = 'chaos';
var VcapClient = require('../index');





describe('request', function () {
    var client = module.exports = new VcapClient({
        protocol: 'http:',
        host:     host,
        email:    email,
        token:    null,
        password: password
    });

    var guid, token, state, sguid;

    it('should accept uaa oauth/token login ', function (done) {
        client.apps.request.login(function (err, tkn) {
            token = tkn;
            assert.ifError(err);
            assert(!!token, 'No token returned');
            done();
        });
    });

    it('should resolve /v2/apps request on client.apps.get', function (done) {
        //debugger;
        client.apps.get(function (err, apps) {
            assert.ifError(err);
            assert(!!apps, 'No apps returned');
            guid = apps[0].metadata.guid;
            done();
        });
    });
    it('should resolve /v2/apps/:guid get request on client.apps.get(:guid)',
        function (done) {
        //debugger;
        client.apps.get(guid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No app returned');
            done();
        });
    });
    it('should resolve /v2/apps/:guid/summary get request ', function (done) {
        client.apps.summary(guid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No summary returned');
            state = app.state;
            done();
        });
    });
    it('should resolve /v2/apps/:guid/stats get request ', function (done) {
        client.apps.stats(guid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No stats returned');
            done();
        });
    });
    it('should resolve /v2/apps/:guid/crashes get request ', function (done) {
        client.apps.crashes(guid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No crashes returned');
            done();
        });
    });
    it('should resolve /v2/apps/:guid/instances get request ', function (done) {
        client.apps.instances(guid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No instances returned');
            sguid = Object.keys(app)[0];
            done();
        });
    });
    it('should resolve /v2/apps/:guid/instances/:id/files get request ',
        function (done) {
        client.apps.instanceFiles(guid, sguid, function (err, app) {
            assert.ifError(err);
            assert(!!app, 'No instances returned');
            done();
        });
    });
    client.apps.relations.each(function (relation) {
        it('should resolve /v2/apps/:guid returned ' +
            relation + '_url relation',
            function (done) {
            client.apps[relation](guid,  function (err, app) {
                assert.ifError(err);
                assert(!!app, 'No instances returned');
                sguid = Object.keys(app)[0];
                done();
            });
        });
    });
});