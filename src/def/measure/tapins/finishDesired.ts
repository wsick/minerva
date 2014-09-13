module minerva.def.measure.tapins {
    export var finishDesired: IMeasureTapin = function (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean {
        var ds = output.desiredSize;
        helpers.coerceSize(ds, assets);
        Thickness.growSize(assets.margin, ds);
        ds.width = Math.min(ds.width, availableSize.width);
        ds.height = Math.min(ds.height, availableSize.height);
        if (assets.useLayoutRounding) {
            ds.width = Math.round(ds.width);
            ds.height = Math.round(ds.height);
        }
        return true;
    };
}