module minerva.def.render.tapins {
    export var validate: IRenderTapin = function (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        if (!assets.TotalIsRenderVisible)
            return false;
        if ((assets.TotalOpacity * 255) < 0.5)
            return false;
        return true;
    };
}