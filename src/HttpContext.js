const createRequest = require('./CreateRequest');
const createResponse = require('./createResponse');

class HttpContext {

    constructor (request, response) {
        this.request = createRequest(request);
        this.response = createResponse(response);
    }

}

module.exports = HttpContext;
