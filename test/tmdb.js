/* global  context, describe, it */

const Tmdb = require('../lib');
const expect = require('chai').expect;
const nock = require('nock');

nock.disableNetConnect();

describe('Tmdb', () => {
    const apiKey = 'XXX';

    function mockQuery(scope, endpoint, query={}) {
        scope.get(endpoint)
            .query(query)
            .query({ api_key: apiKey })
            .reply(200, '{ "page": 1, "results": []}');
    }

    describe('#constructor()', () => {
        context('when no api key is given', () => {
            it('throws an error', function() {
                expect(() => { new Tmdb(); })
                    .to.throw('Missing api key');
            });
        });
    });

    describe('#searchMovie()', function() {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        context('when no query is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.searchMovie())
                    .to.throw('Missing text query');
            });
        });

        it('hits the correct endpoint', () => {
            mockQuery(scope, '/search/movie', { query: 'foo' });

            return tmdb.searchMovie('foo')
                .then(() => expect(scope.isDone()).to.be.true);
        });

        it('passes options as additional query parameters', () => {
            mockQuery(scope, '/search/movie', { query: 'foo', year: 2016 });

            return tmdb.searchMovie('foo', { year: 2016 })
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });

    describe('#discoverMovie()', () => {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        it('hits the correct endpoint', () => {
            mockQuery(scope, '/discover/movie');

            return tmdb.discoverMovie()
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });

    describe('#find()', () => {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        context('when no external id is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.find())
                    .to.throw('Missing external id');
            });
        });

        context('when no external source is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.find(42))
                    .to.throw('Missing external source');
            });
        });

        context('when an invalid external source is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.find(42, 'foo_id'))
                    .to.throw('Unknown external source');
            });
        });

        it('hits the correct endpoint', () => {
            mockQuery(scope, '/find/42', { external_source: 'imdb_id' });

            return tmdb.find(42, 'imdb_id')
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });

    describe('#movieDetails()', function() {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        context('when no id is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.movieDetails())
                    .to.throw('Missing id');
            });
        });

        it('hits the correct endpoint', () => {
            mockQuery(scope, '/movie/42');

            return tmdb.movieDetails(42)
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });
});
