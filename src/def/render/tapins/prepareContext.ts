module minerva.def.render.tapins {
    export var prepareContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        ctx.save();
        ctx.pretransformMatrix(assets.renderXform);
        ctx.raw.globalAlpha = assets.totalOpacity;
        return true;
    };
}