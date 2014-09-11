module minerva.def.render.tapins {
    export var applyClip: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        var clip = assets.Clip;
        if (clip)
            RenderContext.clipGeometry(ctx, clip);
        return true;
    };
}