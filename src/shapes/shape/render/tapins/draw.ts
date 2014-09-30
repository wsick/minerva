module minerva.shapes.shape.render.tapins {
    export function draw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        input.shape
            .draw(ctx)
            .doFill(ctx, input.extents)
            .doStroke(ctx, input.extents);
        return true;
    }
}