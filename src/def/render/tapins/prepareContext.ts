module minerva.def.render.tapins {
    export var prepareContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        RenderContext.save(ctx);
        RenderContext.pretransformMatrix(ctx, assets.RenderXform);
        ctx.globalAlpha = assets.TotalOpacity;
        return true;
    };
}