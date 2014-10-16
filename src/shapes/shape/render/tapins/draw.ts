module minerva.shapes.shape.render.tapins {
    export function draw (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        //No-op
        return true;
    }
}