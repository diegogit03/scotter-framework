import { BindContract, ContainerContract } from './types';
import { BindNotFound } from './Exceptions';

export class Container implements ContainerContract {

    private store: BindContract[] = [];

    public bind (
        namespace: string,
        callback: () => any
    ): this {
        this.store.push({
            namespace,
            callback,
            fake: null
        });

        return this;
    }

    public use (
        namespace: string
    ) {
        const bind = this.store.find(bindItem => bindItem.namespace === namespace);

        if (bind === undefined) {
            throw new BindNotFound(namespace);
        }

        return !bind.fake
            ? bind.callback(this)
            : bind.fake();
    }

    public fake (
        namespace: string,
        callback: () => any
    ): this {
        const bindIndex = this.store.findIndex(bindItem => bindItem.namespace === namespace);

        if (bindIndex === undefined) {
            throw new BindNotFound(namespace);
        }

        this.store[bindIndex].fake = callback;

        return this;
    }

    public restore (
        namespace: string
    ): this {
        const bindIndex = this.store.findIndex(bindItem => bindItem.namespace === namespace);

        if (bindIndex === undefined) {
            throw new BindNotFound(namespace);
        }

        this.store[bindIndex].fake = null;

        return this;
    }

}
