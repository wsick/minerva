module minerva.layout.sizing.tapins {
    export var calcUseRender: ISizingTapin = function (input: IInput, state: IState, output: IOutput): boolean {
        state.useRender = true;
        return true;
    };
}