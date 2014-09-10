module minerva.render.tapins {
    export var postRender:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        if (assets.Effect)
            assets.ctx.restore();
        return true;
    };
}