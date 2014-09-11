module minerva {
    export interface IPipeAssets {
    }
    export interface IPipeState {
    }
    export interface IPipeOutput {
    }
    export interface ITapin {
        (assets: IPipeAssets, state: IPipeState, output: IPipeOutput, ...contexts: any[]): boolean;
    }
}