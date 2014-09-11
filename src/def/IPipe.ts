module minerva.def {
    export interface IPipeAssets {
    }
    export interface IPipeState {
    }
    export interface IPipeOutput {
    }
    export interface IPipe<TAssets extends IPipeAssets, TState extends IPipeState, TOutput extends IPipeOutput> {
        initAssets (assets: TAssets);
        initState (state: TState);
        initOutput (output: TOutput);
    }
}