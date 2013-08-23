var VcapClientDomains = function (request) {
    var Collection = require('./collection')(request);

    var domains = new Collection('domains');

    return domains;
};

module.exports = VcapClientDomains;