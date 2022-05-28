const { test } = require('@japa/runner');
const mock = require('jest-mock');

const MiddlewareStore = require('../../src/MiddlewareStore');

test.group('MiddlewareStore.register', () => {
    test('It should register 3 Middlewares', ({ expect }) => {
        const middlewareStore = new MiddlewareStore();

        middlewareStore.register(() => {})
        middlewareStore.register(() => {})
        middlewareStore.register(() => {})

        expect(middlewareStore._store.length).toBe(3);
    });
});

test.group('MiddlewareStore.run', () => {
    test('It should run middleware', ({ expect }) => {
        const middlewareStore = new MiddlewareStore();

        const middlewareMock = mock.fn();

        middlewareStore.register(middlewareMock);

        middlewareStore.run(null);

        expect(middlewareMock).toHaveBeenCalled();
    });

    test('It should store a param and return in a middleware argument', ({ expect }) =>{
        const middlewareStore = new MiddlewareStore();

        const param = Math.random();

        middlewareStore.register(arg => expect(arg).toBe(param));

        middlewareStore.run(param);
    });

    test('It should pass to next middleware when next function have called', ({ expect }) => {
        const middlewareStore = new MiddlewareStore();

        const middleware = mock.fn();

        middlewareStore.register((arg, next) => next());
        middlewareStore.register(middleware);

        middlewareStore.run(null);

        expect(middleware).toHaveBeenCalled()
    });

    test('It Should reset store when all middlewares are executed', async ({ expect }) => {
        const middlewareStore = new MiddlewareStore();

        function middleware (resolve, next) {
            next();
            resolve(middlewareStore._index);
        }

        middlewareStore.register((arg, next) => next());
        middlewareStore.register(middleware);

        const indexInMiddlewareRunning = await (
            new Promise(resolve => middlewareStore.run(resolve))
        );

        expect(indexInMiddlewareRunning).toBe(0);
    });

    test('It should execute a class middleware when have handle method', ({ expect }) => {
        const middlewareStore = new MiddlewareStore();

        const handleMethodMock = mock.fn();

        function MiddlewareClassMock () {}

        MiddlewareClassMock.prototype.handle = handleMethodMock;

        middlewareStore.register(MiddlewareClassMock);

        middlewareStore.run(null);

        expect(handleMethodMock).toHaveBeenCalled();
    });
});
