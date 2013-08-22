var VcapClientServices = function (request) {
    var Collection = require('./collection')(request);

    var services = new Collection('services', {
        label: { type: 'string' },
        url: { type: 'string' },
        provider: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' }
    });

    return services;
};

module.exports = VcapClientServices;