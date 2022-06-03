import { bind } from './types';

export class Container {

    public store: bind[] = [];

    public bind (
        namespace: string,
        callback: () => any
    ): void {
        this.store.push({
            namespace,
            callback,
            fake: null
        });
    }

    public use (
        namespace: string
    ): any {
        const bind = this.store.find(bindItem => bindItem.namespace === namespace);

        if (bind === undefined) {
            throw new Error('Bind not found');
        }

        return !bind.fake
            ? bind.callback()
            : bind.fake();
    }

    public fake (
        namespace: string,
        callback: () => any
    ): void {
        const bindIndex = this.store.findIndex(bindItem => bindItem.namespace === namespace);

        if (bindIndex === undefined) {
            throw new Error('Bind not found');
        }

        this.store[bindIndex].fake = callback;
    }

}
