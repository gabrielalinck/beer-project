const configureTruckRoutes = require('./truck/truck.routes');
const configureBeerRoutes = require('./beer/beer.routes');
const configureContainerRoutes = require('./container/container.routes');
const configureSensorSimulator = require('./thermometer/sensor.simulator');

module.exports = (app) => {
    configureTruckRoutes(app);
    configureBeerRoutes(app);
    configureContainerRoutes(app);
    configureSensorSimulator(app);
    return app;
};