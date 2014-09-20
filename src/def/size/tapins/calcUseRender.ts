module minerva.def.size.tapins {
    export var calcUseRender: ISizeTapin = function (input: IInput, state: IState, output: IOutput): boolean {
        state.useRender = true;
        return true;
    };
}