module minerva.render.tapins {
    export var preRender:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        var effect = assets.Effect;
        if (!effect)
            return true;
        var ctx = assets.ctx;
        ctx.save();
        effect.PreRender(ctx);
        return true;
    };
}