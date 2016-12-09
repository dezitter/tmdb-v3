const buildUrl = require('./build-url');
const rp = require('request-promise-native');

function fetchResource(endpoint, query={}) {
    const uri = buildUrl(endpoint, query);

    return rp({
        uri,
        resolveWithFullResponse: true
    });
}

module.exports = fetchResource;
