module minerva.def.measure.tapins {
    export var prepareOverride: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, availableSize: Size): boolean {
        Size.copyTo(availableSize, state.availableSize);
        Thickness.shrinkSize(input.margin, state.availableSize);
        helpers.coerceSize(state.availableSize, input);
        return true;
    };
}