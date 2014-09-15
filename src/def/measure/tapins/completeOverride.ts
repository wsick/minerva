module minerva.def.measure.tapins {
    export var completeOverride: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, availableSize: Size): boolean {
        output.dirtyFlags = input.dirtyFlags & ~layout.DirtyFlags.Measure;
        Size.copyTo(output.desiredSize, output.hiddenDesire);
        return true;
    };
}