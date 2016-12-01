class Tmdb {

    constructor(options={}) {
        if (!this instanceof Tmdb) return new Tmdb(options);
        if (!options.apiKey) throw new Error('Missing api key');

        this.apiKey = options.apiKey;
    }
}

module.exports = Tmdb;
