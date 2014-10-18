module minerva.shapes.shape.render.tapins {
    export function prepareDraw (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        ctx.save();
        return true;
    }
}