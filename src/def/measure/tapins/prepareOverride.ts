module minerva.def.measure.tapins {
    export var prepareOverride: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        Size.copyTo(availableSize, state.availableSize);
        Thickness.shrinkSize(assets.margin, state.availableSize);
        helpers.coerceSize(state.availableSize, assets);
        return true;
    };
}