function isValidSource(source) {
    return [
        'freebase_id', 'freebase_mid', 'imdb_id', 'tvdb_id', 'tvrage_id'
    ].indexOf(source) !== -1;
}

module.exports = isValidSource;
