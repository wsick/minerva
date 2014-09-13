module minerva.def.render.tapins {
    export var postRender: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        var effect = assets.effect;
        if (!effect)
            return true;
        effect.PostRender(ctx);
        ctx.restore();
        return true;
    };
}