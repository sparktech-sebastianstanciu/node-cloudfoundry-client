var VcapBillingEvents = function (request) {
    var Collection = require('./collection')(request);

    var be = new Collection('billing_events', {
        organization_guid: { type: 'string' },
        organization_name: { type: 'string' }
    });

    be.get = function (startDate, endDate, callback) {
    	var query = [];
    	if (startDate) {
    		query.add("start_date="+startDate);
    	}
    	if (endDate) {
    		query.add("end_date="+endDate);
    	}
    	var query_string = query.isEmpty() ? "" : "?"+query.join('&')
        request.authedRequest(
            request.getPath('billing_events'+query_string), null, 'GET',
                true, callback);
    };

    return be;
};

module.exports = VcapBillingEvents;