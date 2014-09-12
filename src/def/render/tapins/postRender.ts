module minerva.def.render.tapins {
    export var postRender: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        var effect = assets.Effect;
        if (!effect)
            return true;
        effect.PostRender(ctx);
        RenderContext.restore(ctx);
        return true;
    };
}