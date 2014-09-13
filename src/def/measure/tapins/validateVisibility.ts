module minerva.def.measure.tapins {
    export var validateVisibility: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        if (assets.visibility !== Visibility.Visible) {
            output.previousConstraint = availableSize;
            return false;
        }
        return true;
    };
}