const cache = {};

module.exports = class TruckRepository {


    generateId() {
        return Math.ceil(Math.random() * 9999999);

    }

    getAllTrucks() {
        let trucks = [];
        for (let obj in cache) {
            trucks.push(cache[obj]);
        }
        return trucks;

    }

    getTruckByDriverName(name) {
        for (let obj in cache) {
            if (cache[obj].driver === name) {
                return cache[obj];
            }
        }
        return null;
    }

    saveTruck(truck) {
        let id = this.generateId();
        truck.id = id;
        cache[id] = truck;
        return truck;
    }

    removeTruck(truckId) {
        let truck = cache[truckId];
        if (truck) {
            delete cache[truckId];
            return true;
        } else {
            return false;
        }
    }
};
