var VcapClientOrganizations = function (request) {
    var Collection = require('./collection')(request);

    var organizations = new Collection('organizations', {
        name: { type: 'string' }
    });

    return organizations;
};

module.exports = VcapClientOrganizations;