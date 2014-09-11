module minerva.def.render.tapins {
    export var restoreContext: IRenderTapin = function (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        ctx.restore();
        return true;
    };
}