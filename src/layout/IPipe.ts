module minerva.layout {
    export class IPipe<TAssets extends def.IPipeAssets, TState extends def.IPipeState, TOutput extends def.IPipeOutput> {
        def: def.IPipe<TAssets, TState, TOutput>;
        assets: TAssets;
        state: TState;
        output: TOutput;
    }
}