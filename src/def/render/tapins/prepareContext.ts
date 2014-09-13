module minerva.def.render.tapins {
    export var prepareContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        ctx.save();
        ctx.pretransformMatrix(assets.RenderXform);
        ctx.raw.globalAlpha = assets.TotalOpacity;
        return true;
    };
}