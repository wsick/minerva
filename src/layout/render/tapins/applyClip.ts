module minerva.layout.render.tapins {
    export var applyClip: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        var clip = input.clip;
        if (clip)
            ctx.clipGeometry(clip);
        return true;
    };
}