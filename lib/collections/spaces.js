var VcapClientSpaces = function (request) {
    var Collection = require('./collection')(request);

    var spaces = new Collection('spaces', {
        name: { type: 'string' },
        organization_guid: { type: 'string' }
    });

    return spaces;
};

module.exports = VcapClientSpaces;