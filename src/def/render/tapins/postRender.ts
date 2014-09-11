module minerva.def.render.tapins {
    export var postRender: IRenderTapin = function (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        var effect = assets.Effect;
        if (!effect)
            return true;
        effect.PostRender(ctx);
        ctx.restore();
        return true;
    };
}