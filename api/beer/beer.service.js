const BeerRepository = require('./beer.repository');

module.exports = (beerDomain) => {

    let repository = new BeerRepository();
    let beerService = {};

    beerService.findBeerByName = (name) => {
        return repository.getBeerByName(name);
    };

    beerService.findBeerById = (beerId) => {
        return repository.getBeerById(beerId);
    };

    beerService.getAllBeers = () => {
        return repository.getAllBeers();
    };

    beerService.saveNewBeer = (beer) => {
        return repository.saveBeer(beer);
    };

    beerService.removeBeer = (beerId) => {
        return repository.removeBeer(beerId);
    };

    beerDomain.beerService = beerService;
    return beerDomain;
};