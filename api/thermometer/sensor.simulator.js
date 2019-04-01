const router = require('express').Router();
const Joi = require('joi');

const sensorUpdate = Joi.object().keys({
    containerId: Joi.number().required(),
    tempNow: Joi.number().required()
});

module.exports = (app) => {
    let containerService = app.containerDomain.containerService;
    let beerService = app.beerDomain.beerService;



    function emitAlertEvent(containerId, temp) {
        app.io.emit('alert', {
        containerId: containerId,
           temperature: temp
        });
    }

    function emitTempChange(containerId, temp) {
        app.io.emit('change', {
            containerId: containerId,
            temperature: temp,
        })
    }

    function saveNewTemperature(containerId, temp) {
        containerService.saveNewTemperature(containerId, temp)
    }

    function isValidTemperature(containerId, temp) {
        let container = containerService.findContainerById(containerId);
        let beer = beerService.findBeerById(container.beerId);
        return (temp >= beer.tempMin && temp <= beer.tempMax)
    }

    function generateTemperatureChange(req, res) {
        let update = req.body;

        Joi.validate(update, sensorUpdate, (err) => {
            if (err)
                return res.status(422).send();
            else {
                saveNewTemperature(update.containerId, update.tempNow)
                if (isValidTemperature(update.containerId, update.tempNow)) {
                    emitTempChange(update.containerId, update.tempNow)
                } else {
                    emitAlertEvent(update.containerId, update.tempNow);
                }
                return res.status(204).send();
            }
        });


    }


    router.post('/', generateTemperatureChange);
    router.get('/isValidTemperature/:containerId/:temp', isValidTemperature)


    app.use('/sensor', router);
    return app;
};