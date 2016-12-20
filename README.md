# tmdb-v3

Promise-based Nodejs wrapper around the [TMDb API](https://www.themoviedb.org/documentation/api).

## Install

    $ npm install tmdb-v3

## Example

```javascript
const Tmdb = require('tmdb-v3');
const tmdb = new Tmdb({ apiKey: 'YOUR_API_KEY' });

tmdb.searchMovie('Star Wars')
    .then(response => {
        console.log(response.body);
        // => '{"page":1,"results":[...],...}"
    });
```

## API

### searchMovie(text, options={})

Search for movies using a text query.

```javascript
tmdb.searchMovie('Star Wars', { year: 1983 })
    .then(response => {
        // ...
    });
```

### discoverMovie()

Discover movies.

```javascript
tmdb.discoverMovie()
    .then(response => {
        // ...
    });
```

### find(externalID, source)

Find a movie by external id. See [the tmdb docummentation](https://developers.themoviedb.org/3/find) for supported sources.

```javascript
tmdb.find('tt0338013', 'imdb_id')
    .then(response => {
        // ...
    });
```

### movieDetails(id)

Get the primary information about a movie.

```javascript
tmdb.movieDetails(38)
    .then(response => {
        // ...
    });
```

## Run the tests

    $ git clone https://github.com/dezitter/tmdb-v3
    $ cd tmdb-v3/
    $ npm install
    $ npm test
