module minerva.def.measure.tapins {
    export var completeOverride: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        output.dirtyFlags = assets.dirtyFlags & layout.DirtyFlags.Measure;
        Size.copyTo(output.desiredSize, output.hiddenDesire);
        return true;
    };
}