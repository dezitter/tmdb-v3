/* global beforeEach, context, describe, it */

const expect = require('chai').expect;
const fetchResource = require('../lib/fetch-resource');
const nock = require('nock');

nock.disableNetConnect();

const apiMock  = nock('https://api.themoviedb.org/3');

describe('fetchResource()', () => {

    beforeEach(() => {
        apiMock.get('/foo')
               .query(true)
               .reply(200, '{ "page": 1, "results": []}');
    });

    context('when no endpoint is given', () => {
        it('throws an error', () => {
            expect(() => fetchResource())
                .to.throw('Missing api endpoint');
        });
    });

    it('returns a thenable', function() {
        expect(fetchResource('/foo'))
            .to.respondTo('then');
    });
});
