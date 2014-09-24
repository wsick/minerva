module minerva {
    export interface IWalker<T> {
        step(): boolean;
        current: T;
    }

    export interface IDeepWalker<T> {
        step(): boolean;
        current: T;
        skipBranch();
    }
}