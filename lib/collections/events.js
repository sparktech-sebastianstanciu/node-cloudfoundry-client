var VcapClientEvents = function (request) {
    var Collection = require('./collection')(request);

    var events = new Collection('events');

    return events;
};

module.exports = VcapClientEvents;