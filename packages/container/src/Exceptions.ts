export class BindNotFound extends Error {

    constructor (
        namespace: string
    ) {
        super('Cannot resolve ' + namespace);
    }

}
