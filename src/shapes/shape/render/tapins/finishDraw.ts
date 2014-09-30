module minerva.shapes.shape.render.tapins {
    export function finishDraw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        ctx.restore();
    }
}