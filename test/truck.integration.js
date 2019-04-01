const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Truck REST Integration Test', () => {
    describe('#GET ALL without data', () => {
        it('should get all trucks', (done) => {
            request(app)
                .get('/trucks')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200)
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });

    describe('#POST / #GET / #DELETE resource use', () => {
        let truck = {driver: 'Tom'};
        let createdTruck = {};

        it('should create a truck', (done) => {
            request(app)
                .post('/trucks')
                .send(truck)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.driver).to.be.equal(truck.driver);
                    createdTruck = res.body;
                    done();
                });
        });
        it('should recovery truck', (done) => {
            request(app)
                .get('/trucks/' + truck.driver)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.eql(createdTruck);
                    done();
                });
        });
        it('should delete truck', (done) => {
            request(app)
                .delete('/trucks/' + createdTruck.id)
                .expect(204)
                .end(done);
        });
        it('should return 404 when find truck', (done) => {
            request(app)
                .get('/trucks/' + truck.driver)
                .expect(404)
                .end(done);
        });

    });

    describe('#GET ALL with data', () => {
        let tomTruck = {driver: 'Tom'};
        let naiseTruck = {driver: 'Naise'};
        let tomTruckResponse = {};
        let naiseTruckResponse = {};

        it('should create a truck', (done) => {
            request(app)
                .post('/trucks')
                .send(tomTruck)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.driver).to.be.eql(tomTruck.driver);
                    tomTruckResponse = res.body;
                    done();
                });
        });
        it('should create a truck', (done) => {
            request(app)
                .post('/trucks')
                .send(naiseTruck)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.driver).to.be.eql(naiseTruck.driver);
                    naiseTruckResponse = res.body;
                    done();
                });
        });

        it('should get all trucks', (done) => {
            request(app)
                .get('/trucks')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.property('length', 2);
                    expect(res.body).to.deep.include(tomTruckResponse);
                    expect(res.body).to.deep.include(naiseTruckResponse);
                    done();
                });
        });
    });

    describe('#DELETE', function () {
        it('should get 404 to delete o truck do not exists', (done) => {
            request(app)
                .delete('/trucks/' + 'David')
                .expect(404)
                .end(done);
        });
    });

    describe('#POST Wrong Schema', function () {
        let failSchema = {name: 'David'};
        it('should return 422 for wrong object schema', (done) => {
            request(app)
                .post('/trucks')
                .send(failSchema)
                .expect(422)
                .end(done);
        });
    });
})
;