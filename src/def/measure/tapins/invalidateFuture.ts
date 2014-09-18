module minerva.def.measure.tapins {
    export var invalidateFuture: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, availableSize: Size): boolean {
        output.dirtyFlags |= layout.DirtyFlags.Arrange;
        output.uiFlags |= layout.UIFlags.ArrangeHint;
        output.dirtyFlags |= layout.DirtyFlags.Bounds;
        return true;
    };
}