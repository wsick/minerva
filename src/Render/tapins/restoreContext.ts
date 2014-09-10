module minerva.render.tapins {
    export var restoreContext:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        assets.ctx.restore();
        return true;
    };
}