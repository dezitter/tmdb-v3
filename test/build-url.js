/* global context, describe, it */

const buildUrl = require('../lib/build-url');
const expect = require('chai').expect;

describe('buildUrl()', () => {

    context('when no endpoint is given', () => {
        it('throws an error if no endpoint is given', function() {
            expect(() => buildUrl())
                .to.throw('Missing api endpoint');
        });
    });

    it('prepends the tmdb base url', function() {
        const url = buildUrl('/endpoint');

        expect(url)
            .to.have.string('https://api.themoviedb.org/3');
    });

    it('appends the given endpoint', function() {
        const endpoint = '/endpoint';
        const url = buildUrl(endpoint);

        expect(url)
            .to.have.string(endpoint);
    });

    it('adds arguments as query string', function() {
        const url = buildUrl('/endpoint', {
            foo: 'bar'
        });

        expect(url)
            .to.have.string('?foo=bar');
    });
});
