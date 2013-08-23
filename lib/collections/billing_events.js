var VcapBillingEvents = function (request) {
    var Collection = require('./collection')(request);

    var be = new Collection('billing_events', {
        organization_guid: { type: 'string' },
        organization_name: { type: 'string' }
    });

    return be;
};

module.exports = VcapBillingEvents;