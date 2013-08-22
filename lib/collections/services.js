var VcapClientServices = function (request) {
    var Collection = require('./collection')(request);

    var services = new Collection('services', {
        label: { type: 'string' },
        url: { type: 'string' },
        provider: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' }
    });

    services.getByName = function (name, callback) {
        services.getBy(function (each) {
            return each.entity.label === name;
        }, callback);
    };

    services.getPlanForServiceByName = function (name, callback) {
        var self = services;

        services.getByName(name, function (err, service) {
            if (err) {
                return callback(err);
            }

            self.get(service.metadata.guid).get('service_plans', callback);
        });
    };

    return services;
};

module.exports = VcapClientServices;