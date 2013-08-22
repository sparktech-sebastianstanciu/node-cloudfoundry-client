var VcapClientOrganizations = function (request) {
    var Collection = require('./collection')(request);

    var organizations = new Collection('organizations');

    return organizations;
};

module.exports = VcapClientOrganizations;