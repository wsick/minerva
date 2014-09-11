module minerva.def.render.tapins {
    export var validate: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        if (!assets.TotalIsRenderVisible)
            return false;
        if ((assets.TotalOpacity * 255) < 0.5)
            return false;
        return true;
    };
}