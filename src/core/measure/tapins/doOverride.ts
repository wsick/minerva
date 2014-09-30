module minerva.core.measure.tapins {
    export var doOverride: IMeasureTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, availableSize: Size): boolean {
        output.desiredSize.width = 0;
        output.desiredSize.height = 0;
        return true;
    };
}