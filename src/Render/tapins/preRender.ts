module minerva.render.tapins {
    export var preRender: IRenderTapin = function (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        var effect = assets.Effect;
        if (!effect)
            return true;
        ctx.save();
        effect.PreRender(ctx);
        return true;
    };
}