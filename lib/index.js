const fetchResource = require('./fetch-resource');

class Tmdb {

    constructor(options={}) {
        if (!this instanceof Tmdb) return new Tmdb(options);
        if (!options.apiKey) throw new Error('Missing api key');

        this.apiKey = options.apiKey;
    }

    _fetch(endpoint, query={}) {
        return fetchResource(endpoint, Object.assign({}, query, {
            api_key: this.apiKey
        }))
        .then(JSON.parse);
    }

    searchMovie(query) {
        if (!query) throw new Error('Missing query');

        return this._fetch('/search/movie', { query });
    }

    discoverMovie() {
        return this._fetch('/discover/movie');
    }
}

module.exports = Tmdb;
