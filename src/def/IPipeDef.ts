module minerva.def {
    export interface IPipeInput {
    }
    export interface IPipeState {
    }
    export interface IPipeOutput {
    }
    export interface IPipeDef<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        createState(): TState;
        createOutput(): TOutput;
    }
}