module minerva.def.render.tapins {
    export var validate: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        if (!assets.totalIsRenderVisible)
            return false;
        if ((assets.totalOpacity * 255) < 0.5)
            return false;
        return true;
    };
}