module minerva.layout.render.tapins {
    export var postRender: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        var effect = input.effect;
        if (!effect)
            return true;
        effect.PostRender(ctx);
        ctx.restore();
        return true;
    };
}