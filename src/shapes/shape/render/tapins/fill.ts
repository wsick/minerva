module minerva.shapes.shape.render.tapins {
    export function fill (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        if (input.fill)
            ctx.fillEx(input.fill, input.extents, input.fillRule);
        return true;
    }
}