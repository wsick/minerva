module minerva.def.measure.tapins {
    export var checkNeedMeasure: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        if ((assets.dirtyFlags & layout.DirtyFlags.Measure) > 0)
            return true;
        var pc = assets.previousConstraint;
        return (!pc || pc.width !== availableSize.width || pc.height !== availableSize.height);
    };
}