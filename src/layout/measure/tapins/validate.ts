module minerva.layout.measure.tapins {
    export var validate: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, tree: layout.IUpdaterTree, availableSize: Size): boolean {
        if (isNaN(availableSize.width) || isNaN(availableSize.height)) {
            output.error = "Cannot call Measure using a size with NaN values.";
            return false;
        }
        return true;
    };
}