var VcapClientFrameworks = function (request) {
    var Collection = require('./collection')(request);

    var frameworks = new Collection('frameworks');

    return frameworks;
};

module.exports = VcapClientFrameworks;