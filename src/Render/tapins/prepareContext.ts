module minerva.render.tapins {
    export var prepareContext:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        var ctx = assets.ctx;
        ctx.save();
        RenderContext.pretransform(assets.RenderXform);
        ctx.globalAlpha = assets.TotalOpacity;
    };
}