module minerva.layout {
    export class IPipe<TAssets extends def.IPipeAssets, TState extends def.IPipeState, TOutput extends def.IPipeOutput> {
        def: def.IPipeDef<TAssets, TState, TOutput>;
        assets: TAssets;
        state: TState;
        output: TOutput;
    }

    export function createPipe<TAssets extends def.IPipeAssets, TState extends def.IPipeState, TOutput extends def.IPipeOutput>(pipedef: def.IPipeDef<TAssets, TState, TOutput>, assets): IPipe<TAssets, TState, TOutput> {
        return <IPipe<TAssets, TState, TOutput>> {
            def: pipedef,
            assets: assets,
            state: pipedef.createState(),
            output: pipedef.createOutput()
        };
    }
}