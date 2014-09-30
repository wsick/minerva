module minerva.shapes.shape.render.tapins {
    export function calcShouldDraw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        state.shouldDraw = false;
        if ((input.shapeFlags & ShapeFlags.Empty) === 0)
            return true;
        if (!input.shape.fill && !input.shape.stroke)
            return true;
        state.shouldDraw = true;
        return true;
    }
}