const Tmdb = require('../lib');
const expect = require('chai').expect;

describe('Tmdb', () => {
    describe('#constructor()', () => {
        context('when no api key is given', () => {

            it('throws an error', function() {
                expect(() => { new Tmdb(); })
                    .to.throw('Missing api key');
            });

        });
    });
});
