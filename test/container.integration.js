const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Container REST Integration Test', () => {
    describe('#GET ALL without data', () => {
        it('should get all container from a truck', (done) => {
            request(app)
                .get('/containers')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });

    describe('#POST / #GET / #DELETE resource use', () => {
        let container = {id: 1, beerId: 1, truckId: 1, temp: 1};
        it('should create a container', (done) => {
            request(app)
                .post('/containers')
                .send(container)
                .end((err, res) => {
                    expect(res.status).to.be.equal(201);

                    expect(res.body).to.be.eql(container);
                    done();
                });
        });
        it('should recovery container', (done) => {
            request(app)
                .get('/containers/' + container.id)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.eql(container);
                    done();
                });
        });
        it('should delete container', (done) => {
            request(app)
                .delete('/containers/' + container.id)
                .expect(204)
                .end(done);
        });
        it('should return 404 when find container', (done) => {
            request(app)
                .get('/containers/' + container.id)
                .expect(404)
                .end(done);
        });

    });

    describe('#GET ALL with data', () => {
        let containerOne = {id: 1, beerId: 1, truckId: 1, temp: 1};
        let containerTwo = {id: 2, beerId: 2, truckId: 2, temp: 2};
        it('should create a container', (done) => {
            request(app)
                .post('/containers')
                .send(containerOne)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body).to.be.eql(containerOne);
                    done();
                });
        });
        it('should create a container', (done) => {
            request(app)
                .post('/containers')
                .send(containerTwo)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body).to.be.eql(containerTwo);
                    done();
                });
        });

        it('should get all containers', (done) => {
            request(app)
                .get('/containers')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.deep.contains(containerOne);
                    expect(res.body).to.deep.contains(containerTwo);
                    done();
                });
        });

        it('should get all containers from a truck', (done) => {
            request(app)
                .get('/containers/truck/' + 1)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.deep.contains(containerOne);
                    done();
                });
        });
    });


    describe('#DELETE', function () {
        it('should get 404 to delete a container do not exists', (done) => {
            request(app)
                .delete('/containers/' + 123)
                .expect(404)
                .end(done);
        });
    });

    describe('#POST Wrong Schema', function () {
        let failSchema = {name: 'Container One'};
        it('should return 422 for wrong object schema', (done) => {
            request(app)
                .post('/containers')
                .send(failSchema)
                .expect(422)
                .end(done);
        });
    });
})
;