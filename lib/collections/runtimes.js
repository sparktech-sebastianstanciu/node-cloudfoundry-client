var VcapClientRuntimes = function (request) {
    var Collection = require('./collection')(request);

    var runtimes = new Collection('runtimes');

    return runtimes;
};

module.exports = VcapClientRuntimes;