const fetchResource = require('./fetch-resource');
const isValidSource = require('./is-valid-source');

class Tmdb {

    constructor(options={}) {
        if (!options.apiKey) throw new Error('Missing api key');

        this.apiKey = options.apiKey;
    }

    _fetch(endpoint, query={}) {
        return fetchResource(endpoint, Object.assign({}, query, {
            api_key: this.apiKey
        }));
    }

    searchMovie(text, options={}) {
        if (!text) throw new Error('Missing text query');

        const query = Object.assign({ query: text }, options);

        return this._fetch('/search/movie', query);
    }

    discoverMovie() {
        return this._fetch('/discover/movie');
    }

    find(id, source) {
        if (!id) throw new Error('Missing external id');
        if (!source) throw new Error('Missing external source');
        if (!isValidSource(source)) throw new Error('Unknown external source');

        return this._fetch(`/find/${id}`);
    }
}

module.exports = Tmdb;
