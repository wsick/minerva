module minerva.render.tapins {
    export var applyClip:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        var clip = assets.Clip;
        if (clip)
            RenderContext.clipGeometry(ctx, clip);
        return true;
    };
}