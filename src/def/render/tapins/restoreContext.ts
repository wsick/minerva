module minerva.def.render.tapins {
    export var restoreContext: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean {
        ctx.restore();
        return true;
    };
}