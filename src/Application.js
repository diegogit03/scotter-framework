const http = require('http');

const HttpContext = require('./HttpContext');

class Application {

    /**
     * @param {import('./MiddlewareStore')} middlewareStore
     */
    constructor (middlewareStore) {
        this._middlewareStore = middlewareStore;
        this._server = http.createServer(this.callback());
    }

    /**
     * Register global middleware in server
     * @param {*} middleware
     */
    use (middleware) {
        this._middlewareStore.register(middleware)
    }

    /**
     * Listen server in a port
     * @param {number} port
     * @param {*} callback
     */
    listen (port, callback = () => {}) {
        this._server.listen(port, callback);
    }

    /**
     *
     * @returns {CallableFunction}
     */
    callback () {
        return async (req, res) => {
            await this._middlewareStore.run(new HttpContext(req, res));
        }
    }

}

module.exports = Application;
