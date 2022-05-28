const { test } = require('@japa/runner');
const mock = require('jest-mock');

const createResponse = require('../../src/createResponse');

const createResponseMock = () => {
    return {
        end: mock.fn(),
        setHeader: mock.fn(),
        statusCode: 0,
    }
}

test.group('response.send', () => {
    test('It should send a json when body is a object', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        const body = {message:'test'};
        response.send(body);

        expect(responseMock.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(responseMock.end).toHaveBeenCalledWith(JSON.stringify(body), 'utf8');
    });

    test('It should send a text/plain when body is a string', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        const body = 'test';
        response.send(body);

        expect(responseMock.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
        expect(responseMock.end).toHaveBeenCalledWith(body, 'utf8');
    });
});

test.group('response.status', () => {
    test('It should set status code', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        response.status(200);

        expect(response.statusCode).toBe(200);
    });

    test('It should throw error when status is not a number', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        expect(() => response.status('200')).toThrow();
    });
});

test.group('response.created', () => {
    test('It should return a response with 201 statusCode and your body', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        const body = { message: 'test' };
        response.created(body);

        expect(response.statusCode).toBe(201);
        expect(responseMock.end).toHaveBeenCalledWith(JSON.stringify(body), 'utf8');
    });
});

test.group('response.noContent', () => {
    test('It should return a response with 204 statusCode', ({ expect }) => {
        const responseMock = createResponseMock();
        const response = createResponse(responseMock);

        response.noContent();

        expect(response.statusCode).toBe(204);
    });
});
