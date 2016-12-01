const buildUrl = require('./build-url');
const rp = require('request-promise-native');

function fetchResource(endpoint, query={}) {
    const url = buildUrl(endpoint, query);

    return rp(url);
}

module.exports = fetchResource;
