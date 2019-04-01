const TruckRepository = require('./truck.repository');


module.exports = (truckDomain) => {

    let repository = new TruckRepository();
    let truckService = {};

    truckService.findAllTrucks = () => {
        return repository.getAllTrucks();
    };

    truckService.findTruckByDriverName = (name) => {
        return repository.getTruckByDriverName(name)
    };

    truckService.saveNewTruck = (truck) => {
        return repository.saveTruck(truck);
    };

    truckService.removeTruck = (truckId) => {
      return repository.removeTruck(truckId);
    };

    truckDomain.truckService = truckService;
    return truckDomain;
};