module minerva.def.render.tapins {
    export var applyClip: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        var clip = assets.clip;
        if (clip)
            ctx.clipGeometry(clip);
        return true;
    };
}