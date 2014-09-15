module minerva.layout {
    export class IPipe<TInput extends def.IPipeInput, TState extends def.IPipeState, TOutput extends def.IPipeOutput> {
        def: def.IPipeDef<TInput, TState, TOutput>;
        state: TState;
        output: TOutput;
    }

    export function createPipe<TInput extends def.IPipeInput, TState extends def.IPipeState, TOutput extends def.IPipeOutput>(pipedef: def.IPipeDef<TInput, TState, TOutput>): IPipe<TInput, TState, TOutput> {
        return <IPipe<TInput, TState, TOutput>> {
            def: pipedef,
            state: pipedef.createState(),
            output: pipedef.createOutput()
        };
    }
}