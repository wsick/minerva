module minerva {
    export interface IPipeDefinition {
        initAssets(assets:IPipeAssets);
        initState(state:IPipeState);
        initOutput(output:IPipeOutput);
        getTapins(): ITapin[];
    }
    export interface IPipeAssets {
    }
    export interface IPipeState {
    }
    export interface IPipeOutput {
    }
    export interface ITapin {
        (assets:IPipeAssets, state:IPipeState, output:IPipeOutput): boolean;
    }
}