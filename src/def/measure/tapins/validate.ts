module minerva.def.measure.tapins {
    export var validate: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        if (isNaN(availableSize.width) || isNaN(availableSize.height)) {
            output.error = "Cannot call Measure using a size with NaN values.";
            return false;
        }
        return true;
    };
}