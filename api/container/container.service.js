const ContainerRepository = require('./container.repository');

module.exports = (containerDomain) => {

    let repository = new ContainerRepository();
    let containerService = {};

    containerService.findContainerById = (containerId) => {
        return repository.getContainerById(containerId);
    };

    containerService.findContainersByTruckId = (truckId) => {
        return repository.findContainersByTruckId(truckId);
    };

    containerService.getAllContainers = () => {
        return repository.getAllContainers();
    };

    containerService.saveNewContainer = (container) => {
        return repository.saveContainer(container);
    };

    containerService.removeContainer = (containerId) => {
        return repository.removeContainer(containerId);
    };

    containerService.saveNewTemperature = (containerId, temp) => {
        return repository.saveNewTemperature(containerId, temp);
    };


    containerDomain.containerService = containerService;
    return containerDomain;
};