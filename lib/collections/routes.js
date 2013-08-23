var VcapClientRoutes = function (request) {
    var Collection = require('./collection')(request);

    var routes = new Collection('routes');
    

    return routes;
};

module.exports = VcapClientRoutes;