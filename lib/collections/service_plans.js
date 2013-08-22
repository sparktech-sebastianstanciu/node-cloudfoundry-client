var VcapClientServicePlans = function (request) {
    var Collection = require('./collection')(request);

    var servicePlans = new Collection('service_plans', {
        name: { type: 'string' },
        free: { type: 'bool' },
        description: { type: 'string' }
    });

    return servicePlans;
};

module.exports = VcapClientServicePlans;