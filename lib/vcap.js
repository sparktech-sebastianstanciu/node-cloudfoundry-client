
require('sugar');

var VcapRequest             = require('./vcap_request');
var VcapApps                = require('./collections/apps');
var VcapServices            = require('./collections/services');
var VcapServicePlans        = require('./collections/service_plans');
var VcapServiceInstances    = require('./collections/service_instances');
var VcapOrgs                = require('./collections/organizations');
var VcapSpaces              = require('./collections/spaces');
var VcapRuntimes            = require('./collections/runtimes');
var VcapFrameworks          = require('./collections/frameworks');
var VcapEvents              = require('./collections/events');
var VcapDomains             = require('./collections/domains');
var VcapRoutes              = require('./collections/routes');
var VcapBillingEvents       = require('./collections/billing_events');

var VcapClient = module.exports = function (info, callback) {
    /**
     * VCAP cloudfoundry client.
     *
     * Parameters
     *
     * - info: object containing the following
     *   - host (required): host of CF deployment
     *   - protocol (optional): Protocol to be used
     *     when connecting to the host. Defaults to 'http:'
     *   - token (access token)
     *    
     */

    // ~~~~~ PRIVATE
    var self = this,
        token = info.token;

    if (! info.host) {
        throw new TypeError('host must be provided');
    }

    if (! token) {
        throw new TypeError('no token provided');
    }

    var request  = new VcapRequest(info);

    // --- LOAD COLLECTIONS ------
    this.apps               = new VcapApps(request);
    this.services           = new VcapServices(request);
    this.servicePlans       = new VcapServicePlans(request);
    this.serviceInstances   = new VcapServiceInstances(request);
    this.orgs               = new VcapOrgs(request);
    this.spaces             = new VcapSpaces(request);
    this.runtimes           = new VcapRuntimes(request);
    this.frameworks         = new VcapFrameworks(request);
    this.events             = new VcapEvents(request);
    this.domains            = new VcapDomains(request);
    this.routes             = new VcapRoutes(request);
    this.billing_events     = new VcapBillingEvents(request);

    if (callback) {
        request.login(callback);
    }
};
