/**
 * This class will store all middlewares of the application
 */
class MiddlewareStore {
    /** @private */
    _index = 0;
    /** @private */
    _store = [];
    /** @private */
    _params = [];

    /**
     * Store a middleware
     * @param {*} middleware
     */
    register (middleware) {
        this._store.push(middleware);
    }

    /**
     * This method update middleware stack
     * @private
     */
    async _next () {
        const fn = this._store[this._index++];

        if (fn.prototype.handle) {
            const instance = new fn();
            await instance.handle(...this._params);
            return;
        }

        await fn(...this._params);
    }

    /**
     *  Start middleware stack
     * @param {Object} param
     */
    run (param) {
        this._params = [param, this._next.bind(this)];
        this._next()
    }

}

module.exports = MiddlewareStore;
