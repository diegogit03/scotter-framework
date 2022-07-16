import { test } from '@japa/runner';

import { Container } from '../../index';
import { BindNotFound } from '../../src/Exceptions';

test.group('Container', () => {
    test('It should bind a class', ({ expect }) => {
        class Test {}

        const container = new Container()

        container.bind('Namespace', () => new Test());

        expect(container.use('Namespace')).toBeInstanceOf(Test)
    });

    test('It should throw an Error when bind not Exists', ({ expect }) => {
        const container = new Container();

        expect(() => container.use('Namespace')).toThrowError(BindNotFound);
    });

    test('It should fake a bind', ({ expect }) => {
        class Test {}

        const container = new Container();

        container.bind('Namespace', () => new Test());
        const noFakedBind = container.use('Namespace');

        container.fake('Namespace', () => null);
        const fakedBind = container.use('Namespace');

        expect(noFakedBind).toBeInstanceOf(Test)
        expect(fakedBind).toBe(null)
    });

    test('It should restore a fake bind', ({ expect }) => {
        class Test {}

        const container = new Container();

        container.bind('Namespace', () => new Test());
        container.fake('Namespace', () => null);
        container.restore('Namespace');

        const restoredBind = container.use('Namespace');

        expect(restoredBind).toBeInstanceOf(Test);
    });
});
