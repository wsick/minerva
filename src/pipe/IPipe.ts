module minerva.pipe {
    export class IPipe<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> {
        def: IPipeDef<TInput, TState, TOutput>;
        state: TState;
        output: TOutput;
    }

    export function createPipe<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput>(pipedef: IPipeDef<TInput, TState, TOutput>): IPipe<TInput, TState, TOutput> {
        return <IPipe<TInput, TState, TOutput>> {
            def: pipedef,
            state: pipedef.createState(),
            output: pipedef.createOutput()
        };
    }
}