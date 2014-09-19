module minerva.def.processup.tapins {
    export var processInvalidate: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        return true;
    };
}