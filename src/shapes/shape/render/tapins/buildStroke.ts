module minerva.shapes.shape.render.tapins {
    export function buildStroke (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        var sp = state.strokePars;
        sp.thickness = !input.stroke ? 0.0 : input.strokeThickness;
        sp.startCap = input.strokeStartLineCap;
        sp.endCap = input.strokeEndLineCap;
        sp.join = input.strokeLineJoin;
        sp.miterLimit = input.strokeMiterLimit;
        return true;
    }
}