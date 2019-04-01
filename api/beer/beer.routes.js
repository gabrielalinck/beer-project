const router = require('express').Router();
const Joi = require('joi'); // BIBLIOTECA PARA VALIDAR OBJECT JAVASCRIPT

const configureBeerService = require('./beer.service');

// SCHEMA DA CERVEJA
const beerSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tempMax: Joi.number().required(),
    tempMin: Joi.number().required() // A TEMPERATURA PODE SER NEGATIVA ? VOU ASSUMIR QUE NAO
});

module.exports = (app) => {
    let beerDomain = configureBeerService({});

    function getAllBeers(req, res) {
        let beers = beerDomain.beerService.getAllBeers();
        return res.json(beers);
    }

    function getBeerByName(req, res) {
        let beerName = req.params.beer;
        let beer = beerDomain.beerService.findBeerByName(beerName);
        if (beer) res.json(beer);
        else res.status(404).send();
    }

    function getBeerById(req, res) {
        let beerId = req.params.id;
        let beer = beerDomain.beerService.findBeerById(beerId);
        if (beer) res.json(beer);
        else res.status(404).send();
    }

    function saveNewBeer(req, res) {
        let beer = req.body;

        Joi.validate(beer, beerSchema, (err) => {
            if (err)
                return res.status(422).send();
            else {
                let savedBeer = beerDomain.beerService.saveNewBeer(beer);
                return res.status(201).json(savedBeer);
            }
        });
    }

    function removeBeer(req, res) {
        let beerId = req.params.id;
        let hasBeer = beerDomain.beerService.removeBeer(beerId);
        if (hasBeer) res.status(204).send();
        else res.status(404).send();
    }

    router.get('/', getAllBeers);
    router.get('/:beer', getBeerByName);
    router.post('/', saveNewBeer);
    router.delete('/:id', removeBeer);
    router.get('/find/:id', getBeerById);

    app.use('/beers', router);
    app.beerDomain = beerDomain;
    return router;
};