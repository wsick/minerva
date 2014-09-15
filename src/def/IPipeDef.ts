module minerva.def {
    export interface IPipeAssets {
    }
    export interface IPipeState {
    }
    export interface IPipeOutput {
    }
    export interface IPipeDef<TAssets extends IPipeAssets, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(assets: TAssets, state: TState, output: TOutput, ...contexts: any[]): boolean;
        createState(): TState;
        createOutput(): TOutput;
    }
}