const router = require('express').Router();
const Joi = require('joi');

const configureContainerService = require('./container.service');

const containerSchema = Joi.object().keys({
    id: Joi.number().positive().required(),
    beerId: Joi.number().required(),
    truckId: Joi.number().required(),
    temp: Joi.number().required()
});

module.exports = (app) => {
    let containerDomain = configureContainerService({});

    function getAllContainers(req, res) {
        let containers = containerDomain.containerService.getAllContainers();
        return res.json(containers);
    }

    function getContainerById(req, res) {
        let containerId = req.params.id;
        let container = containerDomain.containerService.findContainerById(containerId);
        if (container) res.json(container);
        else res.status(404).send();
    }

    function getContainerByTruckId(req, res) {
        let truckId = req.params.truckId;
        let containers = containerDomain.containerService.findContainersByTruckId(truckId);
        if (containers) res.json(containers);

    }

    function saveNewContainer(req, res) {
        let container = req.body;

        Joi.validate(container, containerSchema, (err) => {
            if (err)
                return res.status(422).send();
            else {
                let savedContainer = containerDomain.containerService.saveNewContainer(container);
                return res.status(201).json(savedContainer);
            }
        });
    }

    function removeContainer(req, res) {
        let containerId = req.params.id;
        let hasContainer = containerDomain.containerService.removeContainer(containerId);
        if (hasContainer) res.status(204).send();
        else res.status(404).send();
    }

    router.get('/', getAllContainers);
    router.get('/:id', getContainerById);
    router.get('/truck/:truckId', getContainerByTruckId);
    router.post('/', saveNewContainer);
    router.delete('/:id', removeContainer);

    app.use('/containers', router);
    app.containerDomain = containerDomain;
    return router;
};