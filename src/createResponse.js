/**
 *  This function mount the response object for HttpContext
 *
 * @param {import('http').ServerResponse} response
 */
const createResponse = response => {
    response.send = function (body) {
        if(typeof body === 'object') {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(body), 'utf8');
        }

        if(typeof body === 'string') {
            this.setHeader('Content-Type', 'text/plain');
            this.end(body, 'utf8');
        }

        return this;
    }

    response.status = function (status) {
        if (typeof status !== 'number') {
            throw new Error('Invalid status type');
        }

        this.statusCode = status;

        return this;
    }

    response.noContent = function () {
        response.status(204).send().end();
    }

    response.created = function (body) {
        return response.status(201).send(body);
    }

    return response;
}

module.exports = createResponse;
