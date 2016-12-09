/* global beforeEach, context, describe, it */

const Tmdb = require('../lib');
const expect = require('chai').expect;
const nock = require('nock');

nock.disableNetConnect();

describe('Tmdb', () => {
    const apiKey = 'XXX';

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

        beforeEach(() => {
            scope.get('/search/movie')
                 .query({ api_key: apiKey, query: 'foo' })
                 .reply(200, '{ "page": 1, "results": []}');
        });

        context('when no query is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.searchMovie())
                    .to.throw('Missing text query');
            });
        });

        it('hits the correct endpoint', () => {
            return tmdb.searchMovie('foo')
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });

    describe('#discoverMovie()', () => {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        beforeEach(() => {
            scope.get('/discover/movie')
                 .query({ api_key: apiKey })
                 .reply(200, '{ "page": 1, "results": []}');
        });

        it('hits the correct endpoint', () => {
            return tmdb.discoverMovie()
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });

    describe('#find()', () => {
        const tmdb = new Tmdb({ apiKey });
        const scope = nock('https://api.themoviedb.org/3');

        beforeEach(() => {
            scope.get('/find/42')
                 .query({ api_key: apiKey })
                 .reply(200, '{ "movie_results": [] }');
        });

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
            return tmdb.find(42, 'imdb_id')
                .then(() => expect(scope.isDone()).to.be.true);
        });
    });
});
