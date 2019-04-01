const cache = {};


module.exports = class ContainerRepository {

    getAllContainers() {
        let containers = [];
        for (let obj in cache) {
            containers.push(cache[obj]);
        }
        return containers;

    }

    findContainersByTruckId(truckId) {
        let containers = [];
        for (let obj in cache) {
            if (cache[obj].truckId == truckId)
                containers.push(cache[obj]);
        }
        return containers;
    }


    getContainerById(containerId) {
        return cache[containerId] || null;
    }

    saveContainer(container) {
        cache[container.id] = container;
        return container;
    }

    removeContainer(containerId) {
        let container = cache[containerId];
        if (container) {
            delete cache[containerId];
            return true;
        } else {
            return false;
        }
    }

    saveNewTemperature(containerId, newTemp) {
        cache[containerId].temp = newTemp;
        return newTemp;
    }
};