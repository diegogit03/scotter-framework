const Application = require('./src/Application');
const MiddlewareStore = require('./src/MiddlewareStore');

function createApplication () {
    return new Application(new MiddlewareStore());
}

module.exports = createApplication;
