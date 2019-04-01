const cache = {};

module.exports = class TruckRepository {


    generateId() {
        return Math.ceil(Math.random() * 9999999);

    }

    getAllBeers() {
        let beers = [];
        for (let obj in cache) {
            beers.push(cache[obj]);
        }
        return beers;
    }

    getBeerById(beerId) {
        return cache[beerId] || undefined;
    }

    getBeerByName(name) {
        for (let obj in cache) {
            if (cache[obj].name === name) {
                return cache[obj];
            }
        }
        return null;
    }

    saveBeer(beer) {
        let id = this.generateId();
        beer.id = id;
        cache[id] = beer;
        return beer;
    }

    removeBeer(beerId) {
        let beer = cache[beerId];
        if (beer) {
            delete cache[beerId];
            return true;
        } else {
            return false;
        }
    }
};
