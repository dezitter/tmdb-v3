# tmdb-v3

Nodejs wrapper around the [TMDb API](https://www.themoviedb.org/documentation/api).

## Install

    $ npm install tmdb-v3

## How to use


```javascript
const Tmdb = require('tmdb-v3');
const tmdb = new Tmdb({ apiKey: 'YOUR_API_KEY' });

tmdb.searchMovie('Star Wars')
    .then(response => {
        console.log(response.body);
        // => '{"page":1,"results":[...],...}"
    });
```

## Run tests

    $ git clone https://github.com/dezitter/tmdb-v3
    $ cd tmdb-v3/
    $ npm install
    $ npm test

