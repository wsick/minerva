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

    export enum WalkDirection {
        Forward = 0,
        Reverse = 1,
        ZForward = 2,
        ZReverse = 3
    }
}