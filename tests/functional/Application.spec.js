const { test } = require('@japa/runner');
const request = require('supertest');

const MiddlewareStore = require('../../src/MiddlewareStore');
const app = require('../..')(new MiddlewareStore());

test.group('Application', group => {

    group.setup(() => {
        app.use((ctx, next) => next());

        app.use(({ response }) => {
            response.status(200).send('test')
        });

        app.listen(3000);
    });

    test('It should return 200 status and return "test" string', async ({ expect }) => {
        const { text } = await request(app._server)
            .get('/')
            .expect(200);

        expect(text).toBe('test');
    }).timeout(10000);

    group.teardown(async () => {
        app._server.close();
    });

});
