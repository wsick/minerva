module minerva.shapes.shape.render.tapins {
    export function draw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        if (input.path)
            input.path.draw(ctx);
        if (input.fill)
            ctx.fillEx(input.fill, input.extents, input.fillRule);
        ctx.strokeEx(input.stroke, state.strokePars, input.extents);
    }
}