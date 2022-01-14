const { Middleware } = require('co-compose');
const http = require('http');

const HttpContext = require('./HttpContext');

class Application {

    constructor () {
        this._middlewareStore = new Middleware();
        this._middlewareList = [];
        this._server = http.createServer(this.callback());
    }

    use (middleware) {
        this._middlewareList.push(middleware);
    }

    listen (port, callback = () => {}) {
        this._server.listen(port, callback);
    }

    callback () {
        return async (req, res) => {
            this._middlewareStore.register(this._middlewareList);
            await this._middlewareStore.runner().run([new HttpContext(req, res)]);
        }
    }

}

module.exports = Application;
