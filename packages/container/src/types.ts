import { Container } from './Container';

export type BindCallback<ReturnValue extends any> =  () => ReturnValue

export interface BindContract {
    namespace: string;
    fake: (() => any) | null;
    callback: (container: Container) => any;
}

export interface ContainerContract<Binds extends any = any> {
    bind <Namespace extends string>(
        namespace: string,
        callback: BindCallback<Namespace extends keyof Binds ? Binds[Namespace] : any>
    ): this

    fake <Namespace extends string>(
        namespace: string,
        callback: BindCallback<Namespace extends keyof Binds ? Binds[Namespace] : any>
    ): this

    use <Namespace extends string> (
        namespace: string
    ): Namespace extends keyof Binds ? Binds[Namespace] : any

    restore <Namespace extends keyof Binds>(namespace: string): this
}
