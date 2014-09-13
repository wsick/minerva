module minerva.def.render.tapins {
    export var restoreContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        ctx.restore();
        return true;
    };
}