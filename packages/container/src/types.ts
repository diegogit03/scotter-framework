export interface bind {
    namespace: string;
    fake: (() => any) | null;
    callback: () => any;
}
