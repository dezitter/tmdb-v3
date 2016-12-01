const url = require('url');

function buildUrl(endpoint, query={}) {
    if (!endpoint) throw new Error('Missing api endpoint');

    return url.format({
        protocol: 'https',
        hostname: 'api.themoviedb.org/3',
        pathname: endpoint,
        query: query
    });
}

module.exports = buildUrl;
