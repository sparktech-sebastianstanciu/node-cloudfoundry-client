var VcapClient = require('../index');

var host     = 'ourhost.com',
    email    = 'me@me.com',
    password = 'mypassword';

var client = module.exports = new VcapClient({
	protocol: 'http:',
    host:     host,
    email:    email,
    password: password
});

client.host = host;
