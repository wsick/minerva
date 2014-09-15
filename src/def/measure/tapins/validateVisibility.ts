module minerva.def.measure.tapins {
    export var validateVisibility: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        if (assets.visibility !== Visibility.Visible) {
            Size.copyTo(availableSize, output.previousConstraint);
            return false;
        }
        return true;
    };
}