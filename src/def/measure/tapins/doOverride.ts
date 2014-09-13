module minerva.def.measure.tapins {
    export var doOverride: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        state.response.width = 0;
        state.response.height = 0;
        return true;
    };
}