module minerva.def.render.tapins {
    export var prepareContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        ctx.save();
        RenderContext.pretransformMatrix(ctx, assets.RenderXform);
        ctx.globalAlpha = assets.TotalOpacity;
        return true;
    };
}