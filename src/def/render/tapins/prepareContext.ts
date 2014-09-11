module minerva.def.render.tapins {
    export var prepareContext: IRenderTapin = function (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        ctx.save();
        RenderContext.pretransformMatrix(ctx, assets.RenderXform);
        ctx.globalAlpha = assets.TotalOpacity;
        return true;
    };
}