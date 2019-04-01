const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Beer REST Integration Test', () => {
    describe('#GET ALL without data', () => {
        it('should get all beers', (done) => {
            request(app)
                .get('/beers')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });

    describe('#POST / #GET / #DELETE resource use', () => {
        let beer = {name: 'Beer One', description: 'Beer One Plus', tempMax: 6, tempMin: 4};
        let createdBeer = {};

        it('should create a beer', (done) => {
            request(app)
                .post('/beers')
                .send(beer)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.name).to.equal(beer.name);
                    expect(res.body.description).to.equal(beer.description);
                    expect(res.body.tempMax).to.equal(beer.tempMax);
                    expect(res.body.tempMin).to.equal(beer.tempMin);
                    expect(res.body).to.has.property('id').not.null;
                    createdBeer = res.body;
                    done();
                });
        });
        it('should recovery beer', (done) => {
            request(app)
                .get('/beers/' + beer.name)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.eql(createdBeer);
                    done();
                });
        });
        it('should delete beer', (done) => {
            request(app)
                .delete('/beers/' + createdBeer.id)
                .expect(204)
                .end(done);
        });
        it('should return 404 when find beer', (done) => {
            request(app)
                .get('/beers/' + beer.name)
                .expect(404)
                .end(done);
        });

    });

    describe('#GET ALL with data', () => {
        let beerOne = {name: 'Beer One', description: 'Beer One Plus', tempMax: 6, tempMin: 4};
        let beerTwo = {name: 'Beer Two', description: 'Beer Two Plus', tempMax: 3, tempMin: 5};
        let beerOneResponse = {};
        let beerTwoResponse = {};

        it('should create a beer', (done) => {
            request(app)
                .post('/beers')
                .send(beerOne)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.name).to.equal(beerOne.name);
                    expect(res.body.description).to.equal(beerOne.description);
                    expect(res.body.tempMax).to.equal(beerOne.tempMax);
                    expect(res.body.tempMin).to.equal(beerOne.tempMin);
                    expect(res.body).to.has.property('id').not.null;
                    beerOneResponse = res.body;
                    done();
                });
        });
        it('should create a beer', (done) => {
            request(app)
                .post('/beers')
                .send(beerTwo)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.name).to.equal(beerTwo.name);
                    expect(res.body.description).to.equal(beerTwo.description);
                    expect(res.body.tempMax).to.equal(beerTwo.tempMax);
                    expect(res.body.tempMin).to.equal(beerTwo.tempMin);
                    expect(res.body).to.has.property('id').not.null;
                    beerTwoResponse = res.body;
                    done();
                });
        });

        it('should get all beers', (done) => {
            request(app)
                .get('/beers')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.property('length', 2);
                    expect(res.body).to.deep.include(beerOneResponse);
                    expect(res.body).to.deep.include(beerTwoResponse);
                    done();
                });
        });
    });

    describe('#DELETE', function () {
        it('should get 404 to delete o beer do not exists', (done) => {
            request(app)
                .delete('/beers/' + 'beerThree')
                .expect(404)
                .end(done);
        });
    });

    describe('#POST Wrong Schema', function () {
        let failSchema = {name: 'Beer Two', description: 'Beer Two Plus', tempMax: -1, tempMin: 5};
        it('should return 422 for wrong object schema', (done) => {
            request(app)
                .post('/beers')
                .send(failSchema)
                .expect(422)
                .end(done);
        });
    });
})
;