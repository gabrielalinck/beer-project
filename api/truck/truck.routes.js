const router = require('express').Router();
const Joi = require('joi');

const configureTruckService = require('./truck.service');

const truckSchema = Joi.object().keys({
    driver: Joi.string().required()
});

module.exports = (app) => {
    let truckDomain = configureTruckService({});

    function getAllTrucks(req, res) {
        let trucks = truckDomain.truckService.findAllTrucks();
        return res.json(trucks);
    }

    function getTruckByDriverName(req, res) {
        let driverName = req.params.driver;
        let truck = truckDomain.truckService.findTruckByDriverName(driverName);
        if (truck) res.json(truck);
        else res.status(404).send();

    }

    function saveNewTruck(req, res) {
        let truck = req.body;

        Joi.validate(truck, truckSchema, (err) => {
            if (err)
                return res.status(422).send();
            else {
                let savedTruck = truckDomain.truckService.saveNewTruck(truck);
                return res.status(201).json(savedTruck);
            }
        });
    }

    function removeTruck(req, res) {
        let truckId = req.params.id;
        let hasTruck = truckDomain.truckService.removeTruck(truckId);
        if (hasTruck) res.status(204).send();
        else res.status(404).send();
    }

    router.get('/', getAllTrucks);
    router.get('/:driver', getTruckByDriverName);
    router.post('/', saveNewTruck);
    router.delete('/:id', removeTruck);

    app.use('/trucks', router);
    return app;
};