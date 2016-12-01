var buildUrl = require('./build-url');
var rp = require('request-promise-native');

class Tmdb {

    constructor(options={}) {
        if (!this instanceof Tmdb) return new Tmdb(options);
        if (!options.apiKey) throw new Error('Missing api key');

        this.apiKey = options.apiKey;
    }

    searchMovie(query) {
        if (!query) throw new Error('Missing query');

        const url = buildUrl('/search/movie', {
            query,
            api_key: this.apiKey
        });

        return rp(url)
            .then(JSON.parse);
    }

    discoverMovie() {
        const url = buildUrl('/discover/movie', {
            api_key: this.apiKey
        });

        return rp(url)
            .then(JSON.parse);
    }
}

module.exports = Tmdb;
