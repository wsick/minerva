module minerva.layout.measure.tapins {
    export var validateVisibility: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, tree: layout.IUpdaterTree, availableSize: Size): boolean {
        if (input.visibility !== Visibility.Visible) {
            Size.copyTo(availableSize, output.previousConstraint);
            return false;
        }
        return true;
    };
}