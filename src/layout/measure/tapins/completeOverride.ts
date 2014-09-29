module minerva.layout.measure.tapins {
    export var completeOverride: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, tree: layout.IUpdaterTree, availableSize: Size): boolean {
        output.dirtyFlags &= ~DirtyFlags.Measure;
        Size.copyTo(output.desiredSize, output.hiddenDesire);
        return true;
    };
}