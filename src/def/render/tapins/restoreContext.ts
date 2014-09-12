module minerva.def.render.tapins {
    export var restoreContext: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        RenderContext.restore(ctx);
        return true;
    };
}