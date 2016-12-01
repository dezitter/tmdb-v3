/* global beforeEach, context, describe, it */

const Tmdb = require('../lib');
const expect = require('chai').expect;
const nock = require('nock');

nock.disableNetConnect();

const apiMock  = nock('https://api.themoviedb.org/3');

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

    describe('#searchMovie()', () => {
        const tmdb = new Tmdb({ apiKey });

        beforeEach(() => {
            apiMock.get('/search/movie')
                   .query({ api_key: apiKey, query: 'foo' })
                   .reply(200, '{ "page": 1, "results": []}');
        });

        context('when no query is given', () => {
            it('throws an error', function() {
                expect(() => tmdb.searchMovie())
                    .to.throw('Missing query');
            });
        });

        it('returns a thenable', function() {
            expect(tmdb.searchMovie('foo'))
                .to.respondTo('then');
        });

        it('parses the response', function() {
            return tmdb.searchMovie('foo')
                .then(response => expect(response).to.be.an('object'));
        });
    });
});
