var VcapClientServiceInstances = function (request) {
    var Collection = require('./collection')(request);

    var serviceInstance = new Collection('service_instances', {
        name: { type: 'string' },
        space_guid: { type: 'string' },
        service_plan_guid: { type: 'string' }
    });

    return serviceInstance;
};

module.exports = VcapClientServiceInstances;